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

    // Build response with essential data
    const result = {
      url: data.id,
      strategy: strategy,
      timestamp: Date.now(),

      // Performance score
      performanceScore: Math.round(categories.performance.score * 100),

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

      // Top opportunities for optimization
      opportunities: extractOpportunities(audits),

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
function extractOpportunities(audits) {
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
    'uses-responsive-images'
  ];

  for (const auditId of opportunityAudits) {
    const audit = audits[auditId];
    if (audit && audit.details && audit.score !== null && audit.score < 1) {
      opportunities.push({
        id: auditId,
        title: audit.title,
        description: audit.description,
        score: audit.score,
        displayValue: audit.displayValue,
        savings: {
          ms: audit.details.overallSavingsMs || 0,
          bytes: audit.details.overallSavingsBytes || 0
        }
      });
    }
  }

  // Sort by time savings (descending)
  opportunities.sort((a, b) => b.savings.ms - a.savings.ms);

  return opportunities.slice(0, 10); // Return top 10
}
