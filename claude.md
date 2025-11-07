# Page Speed Analyzer - Claude Reference Guide

## Project Overview

Building a production-ready page speed analyzer tool optimized for SEO, incorporating 2024-2025 Web Vitals standards. The tool analyzes website performance using Google's PageSpeed Insights API v5 and provides actionable recommendations.

## Core Web Vitals (2024-2025 Standards)

**Current Core Web Vitals:**
- **LCP (Largest Contentful Paint)**: ≤2.5s (good), 2.5-4.0s (needs improvement), >4.0s (poor)
- **INP (Interaction to Next Paint)**: ≤200ms (good), 200-500ms (needs improvement), >500ms (poor)
- **CLS (Cumulative Layout Shift)**: ≤0.1 (good), 0.1-0.25 (needs improvement), >0.25 (poor)

**Important Update:** INP replaced FID as a Core Web Vital on March 12, 2024. Only 65% of mobile sites achieve good INP scores vs 93% for deprecated FID.

## PageSpeed Insights API v5

### Endpoint & Authentication
- **Endpoint:** `https://www.googleapis.com/pagespeedonline/v5/runPagespeed`
- **API Key:** Required from Google Cloud Console
- **Rate Limits:** 25,000 requests/day, 400 requests/100 seconds (with API key)

### Key Parameters
- `url` (required, must be URL-encoded)
- `strategy` (MOBILE or DESKTOP, defaults to desktop)
- `category` (performance, accessibility, best-practices, seo)
- `key` (your API key)

### Response Structure
- `loadingExperience`: Real user metrics from CrUX (75th percentile)
- `lighthouseResult`: Lab data with detailed audits
- `version`: API version information

### Field Data (CrUX)
Includes real-world metrics with percentile values, distribution, and ratings (FAST, AVERAGE, SLOW):
- `LARGEST_CONTENTFUL_PAINT_MS`
- `INTERACTION_TO_NEXT_PAINT`
- `CUMULATIVE_LAYOUT_SHIFT_SCORE`

## Performance Score Calculation

**Lighthouse Weighted Algorithm:**
- LCP: 25%
- Total Blocking Time (TBT): 30% (proxy for INP in lab)
- CLS: 25%
- First Contentful Paint (FCP): 10%
- Speed Index: 10%

**Score Ratings:**
- 90-100: Fast (green #0CCE6B)
- 50-89: Needs improvement (orange #FFA400)
- 0-49: Slow (red #FF4E42)

## Technology Stack Recommendations

### Frontend
- **Framework:** React 18+ or Vue 3+ with Vite
- **UI:** Material-UI or TailwindCSS
- **State Management:** React Context API or Zustand
- **Visualizations:** Chart.js
- **HTTP:** Native Fetch API with custom wrappers
- **Testing:** Jest + React Testing Library + Cypress

### Backend
- **Serverless Functions:** AWS Lambda or Vercel Functions
- **Runtime:** Node.js 18+
- **Caching:** Redis (AWS ElastiCache, Redis Labs, or Upstash)
- **Database:** PostgreSQL with TimescaleDB or standard PostgreSQL

### Hosting & Deployment
- **Recommended:** Vercel (100GB bandwidth free, unlimited function invocations)
- **Alternatives:** Netlify, Cloudflare Pages, AWS (S3 + CloudFront + Lambda)
- **CI/CD:** GitHub Actions

## Architecture Patterns

### Serverless Function (API Proxy)
**Purpose:**
- Hide API keys from client-side code
- Implement server-side caching
- Add rate limiting
- Preprocess responses to reduce bandwidth

### Multi-Layer Caching Strategy
1. **Client-side:** localStorage (24 hour expiry)
2. **Server-side:** Redis (5 minute expiry)
3. **CDN:** Edge caching for static assets

### Rate Limiting
- **Client-side:** Disable submit button for 3-5s after each test
- **Server-side:** 10 requests/hour for free users, higher for authenticated users
- **Error Handling:** Exponential backoff for 429 errors

## Key API Metrics to Extract

### Primary Metrics
```javascript
{
  performanceScore: data.lighthouseResult.categories.performance.score * 100,
  lcp: data.lighthouseResult.audits['largest-contentful-paint'].numericValue,
  cls: data.lighthouseResult.audits['cumulative-layout-shift'].numericValue,
  tbt: data.lighthouseResult.audits['total-blocking-time'].numericValue,
  fcp: data.lighthouseResult.audits['first-contentful-paint'].numericValue,
  fieldData: data.loadingExperience?.metrics || null
}
```

### Recommendations
- **Opportunities:** Quantifiable improvements with `overallSavingsMs` and `overallSavingsBytes`
- **Diagnostics:** Informational issues without direct savings calculations

## Priority Scoring Algorithm

**High Priority:**
- >500ms or >100KB savings
- Score <0.49
- Easy-to-medium implementation difficulty

**Medium Priority:**
- 200-500ms or 50-100KB savings
- Score 0.50-0.89

**Low Priority:**
- Smaller savings
- Score >0.90
- Hard implementations

## Top 10 Common Recommendations

1. **Eliminate render-blocking resources** (200-2000ms savings)
2. **Reduce unused JavaScript** (100-500KB, 300-1500ms)
3. **Properly size images** (50-500KB per image)
4. **Efficiently encode images** (30-70% size reduction)
5. **Defer offscreen images** (100-1000KB, 500-3000ms)
   - **Warning:** Never lazy-load LCP image
6. **Minify CSS and JavaScript** (10-30% size reduction)
7. **Enable text compression** (Brotli/Gzip, 60-80% reduction)
8. **Serve static assets with efficient cache policy**
9. **Reduce server response time (TTFB)** (<600ms good, <200ms excellent)
10. **Minimize main-thread work** (<4s total)

## Chart.js Visualization Patterns

### Performance Gauge
- **Type:** Doughnut chart
- **Config:** `cutout: '75%'`, `circumference: 180`, `rotation: -90`
- **Colors:** Google's official Core Web Vitals colors

### Core Web Vitals Display
- **Bar charts** for single values
- **Line charts** for trends (with `tension: 0.4`)
- **Grouped bars** for before/after comparisons
- **Radar charts** for mobile vs desktop

### Responsive Design
- Container: `position: relative`
- Chart: `responsive: true`, `maintainAspectRatio: false`
- Mobile adjustments: legends at bottom, smaller fonts (10px vs 12px)
- Layout: CSS Grid with `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`

## SEO Strategy

### Primary Keywords
- "website speed test" (high volume, informational)
- "page speed test" (high volume, informational)
- "free website speed test" (high volume, transactional)
- "site speed test" (medium volume)
- "website performance test" (medium volume)

### Long-tail Opportunities
- "how to test page speed on mobile"
- "website loading time checker"
- "analyze website performance free"
- "page load speed test tool"

### Featured Snippet Opportunities
Structure content with H2/H3 headers as questions with 40-60 word answers:
- What is a good page load speed?
- How do I check my website speed?
- What are Core Web Vitals?
- How to improve page speed score?
- Why is my website slow?

### On-Page SEO Checklist
- **Title:** 50-60 chars, primary keyword first
- **Meta Description:** 120-155 chars, primary keyword, CTA
- **H1:** One per page, include primary keyword
- **URL:** <100 chars, use hyphens, include primary keyword
- **Content:** 1,500-2,500 words, keyword 5-8 times naturally

### Schema Markup
- **WebApplication** schema (JSON-LD)
- **FAQPage** schema for Q&A sections
- **HowTo** schema for tutorial content

## Competitive Landscape

### GTmetrix
- **Model:** Freemium ($4.25-$72.50+/month)
- **Strengths:** Video playback, 30+ locations, device simulation
- **Weaknesses:** Free tier very limited, one location only

### Google PageSpeed Insights
- **Model:** Free
- **Strengths:** Official Google tool, lab + field data, SEO credibility
- **Weaknesses:** No video/waterfall, no location choice, score fluctuation

### Pingdom
- **Model:** Free tool + paid monitoring ($10-15/month)
- **Strengths:** Simple interface, fast results
- **Weaknesses:** Limited free features, uses "onload time" not "fully loaded"

### WebPageTest
- **Model:** Free (with queues) or $180/year premium
- **Strengths:** 40+ locations, real browsers, advanced scripting, detailed waterfalls
- **Weaknesses:** Overwhelming interface, steep learning curve

## Market Differentiation Opportunities

1. **"PageSpeed Insights for non-experts"** - Technical data made understandable
2. **Missing pricing middle** - $9/month tier for freelancers/small agencies
3. **AI-powered insights** - Translate metrics to business impact
4. **Competitor tracking** - Auto-monitor your site vs 3-5 competitors
5. **Video playback standard** - Currently only GTmetrix offers prominently
6. **Mobile-first testing** - Default rather than afterthought

## User Engagement Features

### Historical Tracking
- Time-series database (PostgreSQL with TimescaleDB or InfluxDB)
- Tables: `tests`, `test_metrics`, `daily_aggregates`
- Displays: Timeline, trend charts, quick comparisons

### Export Capabilities
- **PDF:** Puppeteer (best quality), jsPDF (client-side), or PDFKit (server-side)
- **CSV:** Papa Parse for JSON to CSV conversion

### Batch Testing
- Job queue: Bull/BullMQ, RabbitMQ, or AWS SQS
- 3-5 concurrent workers
- Real-time progress via WebSocket/Server-Sent Events

### Comparison Features
- Before/after optimization comparison
- Competitor comparison (3-5 sites)
- Device and location comparison

## Authentication & Tiers

### Free Tier
- 5-10 monitored URLs
- 30-day history retention
- Daily test frequency
- Email alerts only
- Single location testing

### Paid Tiers
- **$9/month:** Individual (100 tests, 5 locations, historical data)
- **$29/month:** Team (unlimited tests, all features)
- **$99/month:** Agency (white-label, team collaboration, priority support)

## Performance Targets for Your Tool

Your page speed analyzer must practice what it preaches:
- **FCP:** <1.5s
- **LCP:** <2.5s (target <2.0s)
- **INP:** <100ms
- **CLS:** <0.05
- **Total bundle:** <200KB gzipped

## 2024-2025 Updates

### Major Changes
- **March 12, 2024:** INP replaced FID as Core Web Vital
- **September 9, 2024:** FID fully deprecated
- **March 2024:** Chrome 123 shipped Long Animation Frames (LoAF) API
- **May 2024:** Lighthouse 12.0 released with major changes

### TTFB Updates
**Updated 2024 thresholds:**
- Good: ≤800ms
- Needs improvement: 800-1,800ms
- Poor: >1,800ms

### Emerging APIs & Features
- **Scheduler.yield():** Better than setTimeout(fn, 0) for breaking long tasks
- **Soft Navigations:** Measuring SPA route transitions
- **Back/Forward Cache (bfcache):** Instant back/forward navigation
- **LCP sub-parts:** Granular breakdown (TTFB, resource load, render delay)

## Implementation Roadmap

### MVP (Weeks 1-2)
- Basic React frontend with form input
- Client-side PageSpeed Insights API calls
- Display basic metrics (score, LCP, CLS, INP)
- Simple error handling
- Deploy to Vercel/Netlify

### Phase 2 (Weeks 3-4)
- Serverless backend proxy
- localStorage caching
- Rate limiting
- Chart.js visualizations
- Mobile-responsive design

### Phase 3 (Weeks 5-6)
- Redis caching layer
- Historical data tracking
- Multiple URL comparison
- Export (PDF/CSV)
- Dark mode, PWA features

### Phase 4 (Weeks 7-8)
- Performance optimization (code splitting)
- Comprehensive SEO
- Accessibility (WCAG 2.1 AA)
- Testing suite (70% unit, 25% integration, 5% E2E)
- Monitoring with Sentry

## Critical Success Factors

1. **Your tool's performance is your credibility** - LCP <1.5s, INP <100ms
2. **API key security is non-negotiable** - Always use backend proxy
3. **Caching dramatically improves experience** - Reduces API usage 80-90%
4. **Mobile-first design reflects behavior** - 60%+ traffic from mobile
5. **Clear error messages maintain trust** - Show progress, friendly errors

## Error Handling Strategy

### HTTP Error Codes
- **400:** Validate and sanitize input earlier
- **403:** API key issues, investigate immediately
- **429:** Implement exponential backoff, respect Retry-After header
- **500:** Retry with backoff (3 attempts: 2s, 4s, 8s delays)

### User-Friendly Messages
❌ "Error 500: Internal server error"
✅ "This URL couldn't be analyzed. Please check that it's publicly accessible and try again"

## Database Schema Examples

```sql
CREATE TABLE tests (
  test_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id),
  url VARCHAR(2048) NOT NULL,
  test_date TIMESTAMP NOT NULL,
  location VARCHAR(50),
  device_type VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tests_user_url_date ON tests(user_id, url, test_date DESC);

CREATE TABLE test_metrics (
  metric_id UUID PRIMARY KEY,
  test_id UUID REFERENCES tests(test_id),
  metric_name VARCHAR(50),
  metric_value DECIMAL(10,3),
  timestamp TIMESTAMP NOT NULL
);
```

## Key Takeaways

1. **INP is the new challenge** - Only 65% of sites pass, comprehensive interaction tracking
2. **Serverless architecture** - Optimal for cost, scale, and simplicity
3. **Multi-layer caching** - Essential for performance and cost reduction
4. **Mobile-first** - Default to mobile testing, optimize for mobile UX
5. **Differentiate through UX** - Make technical data accessible to non-experts
6. **SEO is critical** - Discoverability determines success in crowded market
7. **Bridge the gap** - Between free tools and enterprise monitoring

## Quick Reference: Google Official Colors

```javascript
const CORE_WEB_VITALS_COLORS = {
  good: '#0CCE6B',
  needsImprovement: '#FFA400',
  poor: '#FF4E42'
};
```

## Resources & Tools

- **API:** Google PageSpeed Insights API v5
- **Monitoring:** LoAF API (Chrome 123+), web-vitals.js library
- **Debugging:** Chrome DevTools Coverage, Performance panel
- **Testing:** Lighthouse CI, WebPageTest
- **CDN:** Cloudflare, AWS CloudFront, Vercel Edge Network
