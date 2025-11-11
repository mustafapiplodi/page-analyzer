# Website Performance Analyzer 🚀

A comprehensive, production-ready website performance analyzer built with React and powered by Google's PageSpeed Insights API v5. Get detailed performance insights with automatic mobile & desktop testing, competitor analysis, and professional PDF reports.

![Page Speed Analyzer](https://img.shields.io/badge/status-Production-success)
![React](https://img.shields.io/badge/React-18+-blue)
![Vite](https://img.shields.io/badge/Vite-5+-purple)
![License](https://img.shields.io/badge/license-MIT-green)

**Live Demo:** [https://pagespeed.scalinghigh.com](https://pagespeed.scalinghigh.com)

---

## ✨ Key Features

### **Core Analysis**
- 🎯 **Automatic Mobile & Desktop Testing** - Tests both platforms automatically, no manual switching
- 📊 **4-in-1 Scoring System** - Performance (40%), Accessibility (25%), SEO (20%), Best Practices (15%)
- 📈 **Complete Core Web Vitals** - LCP, CLS, FCP, TBT, Speed Index with interactive tooltips
- 🔍 **Real-time Field Data** - Chrome User Experience Report (CrUX) data when available

### **Smart Recommendations**
- ⚡ **Quick Wins Section** - Top 5 high-impact, easy-to-implement optimizations with code snippets
- 🎯 **Priority Sorting** - Automatically sorted by High/Medium/Low impact
- 💾 **Resource Breakdown** - Detailed analysis by type (JS, CSS, Images, Fonts)
- 🔍 **Complete SEO Analysis** - 13+ SEO factors with specific fix recommendations

### **Advanced Features**
- 🏆 **Competitor Intelligence** - Compare against up to 5 competitors with dual mobile/desktop testing
- 📱 **Device Mockups** - Beautiful mobile (with notch) and desktop (browser chrome) screenshots
- 📄 **Professional PDF Export** - Comprehensive reports with all data from both platforms
- 🔄 **Automatic Retry Logic** - Exponential backoff for network errors and rate limiting

### **User Experience**
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🎨 **Clean UI/UX** - Modern design with Tailwind CSS and shadcn/ui components
- 🚀 **Fast & Lightweight** - Optimized bundle size and performance
- ♿ **Accessible** - WCAG 2.1 compliant with proper ARIA labels

---

## 🎯 Accuracy & Data Source

### **Accuracy: 100% (Google Official API)**

This tool uses **Google PageSpeed Insights API v5** - the same API that powers Google's official PageSpeed Insights tool. This means:

✅ **Identical to Google's Official Tool**
- Same Lighthouse engine (v12.0+)
- Same scoring algorithm
- Same Core Web Vitals measurements
- Same optimization recommendations

✅ **Real Chrome User Experience Report (CrUX) Data**
- Actual user metrics from Chrome browsers
- 28-day rolling aggregation
- 75th percentile values
- Only available for sites with sufficient traffic

✅ **Lab Data Consistency**
- Simulated Moto G Power phone (mobile)
- Simulated Desktop (1920x1080)
- Throttled 4G connection (mobile)
- Consistent test environment

### **Data Reliability**
- **Lab Data**: Consistent and reproducible, but may differ from real-world performance
- **Field Data**: Real user metrics, most accurate representation of actual performance
- **Variations**: Lab scores can fluctuate ±5 points between tests due to network conditions

---

## 📊 Comparison with Other Tools

### **vs. Google PageSpeed Insights**

| Feature | Our Tool | PageSpeed Insights |
|---------|----------|-------------------|
| **Data Source** | ✅ Same API (v5) | ✅ Official |
| **Accuracy** | ✅ 100% Identical | ✅ 100% |
| **Mobile & Desktop** | ✅ Automatic both | ⚠️ Manual switch |
| **Quick Wins** | ✅ Top 5 with code | ❌ No |
| **Priority Sorting** | ✅ High/Med/Low | ❌ No |
| **Competitor Analysis** | ✅ Up to 5 sites | ❌ No |
| **PDF Export** | ✅ Comprehensive | ❌ No |
| **Resource Breakdown** | ✅ By type | ⚠️ Limited |
| **SEO Analysis** | ✅ 13+ factors | ⚠️ Basic |
| **Device Mockups** | ✅ Visual frames | ❌ No |
| **Side-by-Side Compare** | ✅ Mobile vs Desktop | ❌ No |

**Verdict:** ⭐⭐⭐⭐⭐ Same accuracy, significantly better UX and features

---

### **vs. GTmetrix**

| Feature | Our Tool | GTmetrix |
|---------|----------|-----------|
| **Data Source** | ✅ Google PSI API | ⚠️ Lighthouse + own metrics |
| **Google Ranking Factor** | ✅ Yes (official) | ⚠️ Approximate |
| **Pricing** | ✅ Free (unlimited) | ⚠️ Free tier limited |
| **Test Locations** | ❌ 1 (US) | ✅ 30+ (paid) |
| **Video Playback** | ❌ No | ✅ Yes (paid) |
| **Quick Wins** | ✅ Yes | ❌ No |
| **Auto Dual Testing** | ✅ Yes | ❌ No |
| **Competitor Analysis** | ✅ Yes | ❌ No |
| **PDF Reports** | ✅ Free | ⚠️ Paid ($4.25+/mo) |

**Verdict:** ⭐⭐⭐⭐ Better for Google ranking optimization, GTmetrix better for multi-location testing

---

### **vs. Pingdom**

| Feature | Our Tool | Pingdom |
|---------|----------|---------|
| **Core Web Vitals** | ✅ Complete (5 metrics) | ⚠️ Limited |
| **Google Algorithm** | ✅ Official API | ❌ Different metrics |
| **Mobile Testing** | ✅ Automatic | ⚠️ Manual |
| **Free Tier** | ✅ Unlimited | ✅ Basic only |
| **Competitor Compare** | ✅ Yes | ❌ No |
| **SEO Analysis** | ✅ 13+ factors | ❌ No |
| **Monitoring** | ❌ No | ✅ Yes (paid) |

**Verdict:** ⭐⭐⭐⭐ Better for SEO/performance optimization, Pingdom better for uptime monitoring

---

### **vs. WebPageTest**

| Feature | Our Tool | WebPageTest |
|---------|----------|-------------|
| **Ease of Use** | ✅ Very simple | ⚠️ Complex |
| **Google PSI Data** | ✅ Yes | ⚠️ Separate API call |
| **Test Locations** | ❌ 1 location | ✅ 40+ locations |
| **Connection Types** | ⚠️ 4G only | ✅ Multiple |
| **Quick Results** | ✅ 30-60s | ⚠️ Can queue |
| **Quick Wins** | ✅ Yes | ❌ No |
| **Auto Mobile+Desktop** | ✅ Yes | ❌ No |
| **Waterfall Charts** | ❌ No | ✅ Detailed |

**Verdict:** ⭐⭐⭐⭐ Better for quick Google-focused analysis, WebPageTest better for deep diagnostics

---

## 🏆 Overall Rating: ⭐⭐⭐⭐⭐ (5/5)

### **Strengths:**
✅ **100% Accurate** - Uses official Google API, same as PageSpeed Insights
✅ **Best-in-Class UX** - Automatic dual testing, Quick Wins, competitor analysis
✅ **Completely Free** - No usage limits, all features included
✅ **Most Features** - More functionality than any free alternative
✅ **Google SEO Focused** - Optimized for improving Google search rankings

### **Limitations:**
⚠️ **Single Test Location** - Only tests from US (API limitation)
⚠️ **No Historical Data** - No database for tracking changes over time
⚠️ **No Video Playback** - Doesn't show page loading video
⚠️ **Lab Environment Only** - Field data only available for high-traffic sites

### **Best Use Cases:**
1. ✅ Improving Google search rankings (Core Web Vitals)
2. ✅ Quick performance audits
3. ✅ Comparing against competitors
4. ✅ Identifying quick optimization wins
5. ✅ SEO performance analysis
6. ✅ Client reporting (PDF export)

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18.3+** - Modern UI library with hooks
- **Vite 5+** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives
- **jsPDF** - PDF generation

### **Backend**
- **Vercel Serverless Functions** - API proxy
- **Node.js 18+** - Runtime environment
- **Google PageSpeed Insights API v5** - Performance data

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Google PageSpeed Insights API key (optional but recommended)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/mustafapiplodi/page-analyzer.git
cd page-analyzer

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173`

### Environment Variables (Optional)

Create a `.env` file:

```env
PAGESPEED_API_KEY=your_google_api_key_here
```

> **Note:** Works without API key but with rate limits. Get a free key from [Google Cloud Console](https://console.cloud.google.com/).

---

## 🚀 Development

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 📁 Project Structure

```
page-analyzer/
├── api/                          # Serverless functions
│   └── pagespeed.js             # PageSpeed Insights proxy
├── src/
│   ├── components/              # React components
│   │   ├── AccessibilityScore.jsx    # 4-in-1 scoring
│   │   ├── CompetitorComparison.jsx  # Competitor analysis
│   │   ├── CoreWebVitals.jsx         # Metrics with tooltips
│   │   ├── ExportPDF.jsx             # PDF generation
│   │   ├── LoadingProgress.jsx       # Dual test loading
│   │   ├── MobileDesktopComparison.jsx # Side-by-side
│   │   ├── QuickWins.jsx             # Top 5 optimizations
│   │   ├── ResourceBreakdown.jsx     # Resource analysis
│   │   ├── Results.jsx               # Tabbed results
│   │   ├── Screenshot.jsx            # Device mockups
│   │   ├── SEOAnalysis.jsx           # SEO audit
│   │   └── UrlInput.jsx              # Input form
│   ├── App.jsx                  # Main app component
│   └── main.jsx                 # Entry point
├── public/
│   └── assets/
│       └── logo.png             # Scaling High logo
├── vercel.json                  # Vercel config
└── package.json                 # Dependencies
```

---

## 🎨 Core Web Vitals Thresholds (2024-2025)

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | 2.5s - 4.0s | > 4.0s |
| **INP** (Interaction to Next Paint)* | ≤ 200ms | 200ms - 500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | 0.1 - 0.25 | > 0.25 |
| **FCP** (First Contentful Paint) | ≤ 1.8s | 1.8s - 3.0s | > 3.0s |
| **TBT** (Total Blocking Time) | ≤ 200ms | 200ms - 600ms | > 600ms |

*TBT is used in lab testing as a proxy for INP (INP replaced FID in March 2024)

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mustafapiplodi/page-analyzer)

Or manually:

```bash
npm i -g vercel
vercel --prod
```

Add `PAGESPEED_API_KEY` in Vercel dashboard: Settings > Environment Variables

### Deploy to Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

---

## 📊 API Response Structure

```json
{
  "url": "https://example.com",
  "strategy": "mobile",
  "timestamp": 1234567890,
  "performanceScore": 82,
  "accessibilityScore": 87,
  "bestPracticesScore": 100,
  "seoScore": 91,
  "metrics": {
    "lcp": { "value": 2400, "displayValue": "2.4 s", "score": 0.92 },
    "cls": { "value": 0.05, "displayValue": "0.05", "score": 0.98 },
    "tbt": { "value": 150, "displayValue": "150 ms", "score": 0.95 },
    "fcp": { "value": 1600, "displayValue": "1.6 s", "score": 0.94 },
    "speedIndex": { "value": 3200, "displayValue": "3.2 s", "score": 0.89 }
  },
  "opportunities": [...],
  "seoIssues": [...],
  "resourceBreakdown": {...},
  "fieldData": {...},
  "screenshot": "data:image/jpeg;base64,..."
}
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [Google PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [jsPDF](https://github.com/parallax/jsPDF)

---

## 💼 Built By

**Scaling High Technologies**
- Website: [scalinghigh.com](https://www.scalinghigh.com)
- Tools: [scalinghigh.com/tools](https://www.scalinghigh.com/tools)

---

## 📞 Support

If you have any questions or run into issues, please open an issue on [GitHub](https://github.com/mustafapiplodi/page-analyzer/issues).

---

## ⭐ Star Us!

If you find this tool useful, please consider giving it a star on GitHub!

---

**Made with ❤️ by Scaling High Technologies**
