/**
 * Serverless API endpoint for PageSpeed Insights
 * Proxies requests to Google's PageSpeed API to hide API keys
 * and implement caching
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, strategy = 'mobile' } = req.body;

  // Validate URL
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // Validate URL format
    new URL(url);
  } catch (error) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  // Validate strategy
  if (!['mobile', 'desktop'].includes(strategy)) {
    return res.status(400).json({ error: 'Strategy must be "mobile" or "desktop"' });
  }

  try {
    // Build PageSpeed Insights API URL
    const apiEndpoint = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    const apiUrl = new URL(apiEndpoint);
    apiUrl.searchParams.set('url', url);
    apiUrl.searchParams.set('strategy', strategy);
    apiUrl.searchParams.set('category', 'performance');
    apiUrl.searchParams.set('category', 'accessibility');
    apiUrl.searchParams.set('category', 'best-practices');

    // Add API key if available (optional for now, can be added via environment variable)
    if (process.env.PAGESPEED_API_KEY) {
      apiUrl.searchParams.set('key', process.env.PAGESPEED_API_KEY);
    }

    // Make request to PageSpeed API
    const response = await fetch(apiUrl.toString());

    // Handle rate limiting
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After') || 60;
      return res.status(429).json({
        error: `Rate limit exceeded. Please try again in ${retryAfter} seconds.`
      });
    }

    // Handle authentication errors
    if (response.status === 403) {
      console.error('PageSpeed API authentication error');
      return res.status(500).json({
        error: 'Service temporarily unavailable. Please try again later.'
      });
    }

    // Handle other errors
    if (!response.ok) {
      console.error('PageSpeed API error:', response.status);
      return res.status(500).json({
        error: 'Failed to analyze page. Please ensure the URL is publicly accessible.'
      });
    }

    const data = await response.json();

    // Extract relevant metrics
    const lighthouseResult = data.lighthouseResult;
    const categories = lighthouseResult.categories;
    const audits = lighthouseResult.audits;

    // Detect framework/stack
    const detectedStack = detectFramework(audits, lighthouseResult);

    // Build response with essential data
    const result = {
      url: data.id,
      strategy: strategy,
      timestamp: Date.now(),

      // Performance score
      performanceScore: Math.round(categories.performance.score * 100),

      // Accessibility score
      accessibilityScore: Math.round(categories.accessibility.score * 100),

      // Best practices score
      bestPracticesScore: Math.round(categories['best-practices'].score * 100),

      // Detected stack/framework
      detectedStack: detectedStack,

      // Core Web Vitals (Lab data)
      metrics: {
        lcp: {
          value: audits['largest-contentful-paint']?.numericValue || 0,
          displayValue: audits['largest-contentful-paint']?.displayValue || 'N/A',
          score: audits['largest-contentful-paint']?.score || 0
        },
        cls: {
          value: audits['cumulative-layout-shift']?.numericValue || 0,
          displayValue: audits['cumulative-layout-shift']?.displayValue || 'N/A',
          score: audits['cumulative-layout-shift']?.score || 0
        },
        tbt: {
          value: audits['total-blocking-time']?.numericValue || 0,
          displayValue: audits['total-blocking-time']?.displayValue || 'N/A',
          score: audits['total-blocking-time']?.score || 0
        },
        fcp: {
          value: audits['first-contentful-paint']?.numericValue || 0,
          displayValue: audits['first-contentful-paint']?.displayValue || 'N/A',
          score: audits['first-contentful-paint']?.score || 0
        },
        speedIndex: {
          value: audits['speed-index']?.numericValue || 0,
          displayValue: audits['speed-index']?.displayValue || 'N/A',
          score: audits['speed-index']?.score || 0
        }
      },

      // Field data (real user data from CrUX if available)
      fieldData: data.loadingExperience ? {
        overallCategory: data.loadingExperience.overall_category,
        metrics: data.loadingExperience.metrics || null
      } : null,

      // Top opportunities for optimization (framework-aware)
      opportunities: extractOpportunities(audits, detectedStack),

      // Accessibility issues
      accessibilityIssues: extractAccessibilityIssues(audits),

      // Screenshot
      screenshot: lighthouseResult.audits['final-screenshot']?.details?.data || null
    };

    return res.status(200).json(result);

  } catch (error) {
    console.error('Error analyzing page speed:', error);
    return res.status(500).json({
      error: 'An unexpected error occurred. Please try again.'
    });
  }
}

/**
 * Extract top optimization opportunities from audits
 */
function extractOpportunities(audits, detectedStack) {
  const opportunities = [];

  const opportunityAudits = [
    'render-blocking-resources',
    'unused-javascript',
    'unused-css-rules',
    'modern-image-formats',
    'offscreen-images',
    'unminified-css',
    'unminified-javascript',
    'efficient-animated-content',
    'uses-text-compression',
    'uses-responsive-images',
    'uses-optimized-images',
    'uses-webp-images'
  ];

  for (const auditId of opportunityAudits) {
    const audit = audits[auditId];
    if (audit && audit.details && audit.score !== null && audit.score < 1) {
      const opportunity = {
        id: auditId,
        title: audit.title,
        description: audit.description,
        score: audit.score,
        displayValue: audit.displayValue,
        savings: {
          ms: audit.details.overallSavingsMs || 0,
          bytes: audit.details.overallSavingsBytes || 0
        },
        // Add framework-specific recommendations
        frameworkAdvice: getFrameworkSpecificAdvice(auditId, detectedStack)
      };
      opportunities.push(opportunity);
    }
  }

  // Sort by time savings (descending)
  opportunities.sort((a, b) => b.savings.ms - a.savings.ms);

  return opportunities.slice(0, 10); // Return top 10
}

/**
 * Detect framework/tech stack from audits
 */
function detectFramework(audits, lighthouseResult) {
  const detectedStack = {
    framework: null,
    libraries: [],
    cms: null,
    bundler: null,
    confidence: 'low'
  };

  // Get script treemap data
  const scripts = lighthouseResult.audits['script-treemap-data']?.details?.nodes || [];
  const finalUrl = lighthouseResult.finalUrl || '';

  // Analyze script names and content
  const scriptNames = scripts.map(s => s.name?.toLowerCase() || '').join(' ');

  // Framework detection
  if (scriptNames.includes('react') || scriptNames.includes('_react')) {
    if (scriptNames.includes('next') || scriptNames.includes('_next')) {
      detectedStack.framework = 'Next.js';
      detectedStack.confidence = 'high';
    } else if (scriptNames.includes('gatsby')) {
      detectedStack.framework = 'Gatsby';
      detectedStack.confidence = 'high';
    } else {
      detectedStack.framework = 'React';
      detectedStack.confidence = 'medium';
    }
  } else if (scriptNames.includes('vue')) {
    if (scriptNames.includes('nuxt')) {
      detectedStack.framework = 'Nuxt.js';
      detectedStack.confidence = 'high';
    } else {
      detectedStack.framework = 'Vue.js';
      detectedStack.confidence = 'medium';
    }
  } else if (scriptNames.includes('angular')) {
    detectedStack.framework = 'Angular';
    detectedStack.confidence = 'medium';
  } else if (scriptNames.includes('svelte')) {
    detectedStack.framework = 'Svelte';
    detectedStack.confidence = 'medium';
  }

  // CMS detection
  if (finalUrl.includes('wp-content') || scriptNames.includes('wp-')) {
    detectedStack.cms = 'WordPress';
  } else if (scriptNames.includes('shopify')) {
    detectedStack.cms = 'Shopify';
  } else if (scriptNames.includes('wix')) {
    detectedStack.cms = 'Wix';
  } else if (scriptNames.includes('squarespace')) {
    detectedStack.cms = 'Squarespace';
  }

  // Bundler detection
  if (scriptNames.includes('webpack')) {
    detectedStack.bundler = 'Webpack';
  } else if (scriptNames.includes('vite')) {
    detectedStack.bundler = 'Vite';
  } else if (scriptNames.includes('rollup')) {
    detectedStack.bundler = 'Rollup';
  }

  // Library detection
  if (scriptNames.includes('jquery')) {
    detectedStack.libraries.push('jQuery');
  }
  if (scriptNames.includes('lodash')) {
    detectedStack.libraries.push('Lodash');
  }

  return detectedStack;
}

/**
 * Get framework-specific advice for an optimization
 */
function getFrameworkSpecificAdvice(auditId, detectedStack) {
  const { framework, cms } = detectedStack;

  const adviceMap = {
    'unused-javascript': {
      'React': {
        tip: 'Use React.lazy() for code splitting',
        code: `const MyComponent = React.lazy(() => import('./MyComponent'));`,
        effort: 'Medium',
        impact: 'High'
      },
      'Next.js': {
        tip: 'Use Next.js dynamic imports',
        code: `const DynamicComponent = dynamic(() => import('../components/hello'));`,
        effort: 'Easy',
        impact: 'High'
      },
      'Vue.js': {
        tip: 'Use Vue async components',
        code: `const AsyncComp = defineAsyncComponent(() => import('./MyComponent.vue'));`,
        effort: 'Medium',
        impact: 'High'
      }
    },
    'modern-image-formats': {
      'Next.js': {
        tip: 'Use Next.js Image component (auto WebP/AVIF)',
        code: `<Image src="/hero.jpg" width={1200} height={600} alt="Hero" />`,
        effort: 'Easy',
        impact: 'Very High'
      },
      'WordPress': {
        tip: 'Install WebP Express or Imagify plugin',
        code: null,
        effort: 'Easy',
        impact: 'High'
      }
    },
    'offscreen-images': {
      'React': {
        tip: 'Use react-lazy-load or native loading="lazy"',
        code: `<img src="/image.jpg" loading="lazy" alt="Description" />`,
        effort: 'Easy',
        impact: 'Medium'
      },
      'Next.js': {
        tip: 'Use Next.js Image with priority prop carefully',
        code: `<Image src="/hero.jpg" priority /> // Only for above-fold images`,
        effort: 'Easy',
        impact: 'High'
      }
    }
  };

  // Return framework-specific advice if available
  if (adviceMap[auditId] && framework && adviceMap[auditId][framework]) {
    return adviceMap[auditId][framework];
  }

  // Return CMS-specific advice if available
  if (adviceMap[auditId] && cms && adviceMap[auditId][cms]) {
    return adviceMap[auditId][cms];
  }

  return null;
}

/**
 * Extract accessibility issues
 */
function extractAccessibilityIssues(audits) {
  const issues = [];

  const a11yAudits = [
    'color-contrast',
    'image-alt',
    'button-name',
    'link-name',
    'meta-viewport',
    'document-title',
    'html-has-lang',
    'aria-required-attr',
    'aria-valid-attr-value',
    'label',
    'tap-targets'
  ];

  for (const auditId of a11yAudits) {
    const audit = audits[auditId];
    if (audit && audit.score !== null && audit.score < 1) {
      issues.push({
        id: auditId,
        title: audit.title,
        description: audit.description,
        score: audit.score,
        impact: audit.score < 0.5 ? 'high' : audit.score < 0.9 ? 'medium' : 'low',
        itemCount: audit.details?.items?.length || 0
      });
    }
  }

  return issues;
}
