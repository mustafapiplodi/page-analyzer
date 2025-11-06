# Page Speed Analyzer 🚀

A modern, production-ready website performance analyzer built with React and powered by Google's PageSpeed Insights API v5. Analyze any website's performance based on 2024-2025 Core Web Vitals standards (LCP, INP, CLS).

![Page Speed Analyzer](https://img.shields.io/badge/status-MVP-green)
![React](https://img.shields.io/badge/React-18+-blue)
![Vite](https://img.shields.io/badge/Vite-5+-purple)

## ✨ Features

- **🎯 Core Web Vitals Analysis**: Measure LCP, CLS, FCP, TBT, and Speed Index
- **📱 Mobile & Desktop Testing**: Test performance on both mobile and desktop devices
- **📊 Visual Performance Score**: Beautiful gauge chart showing overall performance (0-100)
- **🎨 Google's Official Color Scheme**: Uses official Core Web Vitals colors for consistency
- **💡 Optimization Recommendations**: Get top 10 actionable improvements with potential savings
- **⚡ Real-time Field Data**: Shows Chrome User Experience Report data when available
- **🔒 Secure API Proxy**: Serverless backend hides API keys and handles rate limiting
- **📱 Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
- **♿ Accessible**: Built with accessibility in mind
- **🎯 SEO Optimized**: Meta tags and structured data for search visibility

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Lightning-fast build tool and dev server
- **Chart.js** - Beautiful, responsive charts for data visualization
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Vercel Serverless Functions** - API proxy for PageSpeed Insights
- **Node.js 18+** - Runtime environment
- **Google PageSpeed Insights API v5** - Performance data source

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- (Optional) Google PageSpeed Insights API key

### Clone and Install

```bash
# Clone the repository
git clone https://github.com/mustafapiplodi/page-analyzer.git
cd page-analyzer

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory (optional but recommended):

```env
PAGESPEED_API_KEY=your_google_api_key_here
```

> **Note**: The app works without an API key but with stricter rate limits. Get a free API key from [Google Cloud Console](https://console.cloud.google.com/).

## 🚀 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
page-analyzer/
├── api/                      # Serverless API functions
│   └── pagespeed.js         # PageSpeed Insights proxy
├── src/
│   ├── components/          # React components
│   │   ├── UrlInput.jsx    # URL input form
│   │   ├── PerformanceScore.jsx  # Gauge chart
│   │   ├── CoreWebVitals.jsx     # Metrics display
│   │   ├── Opportunities.jsx     # Recommendations
│   │   └── Results.jsx      # Results container
│   ├── App.jsx              # Main app component
│   ├── App.css              # App styles
│   ├── index.css            # Global styles
│   └── main.jsx             # App entry point
├── public/                   # Static assets
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── vercel.json              # Vercel deployment config
└── package.json             # Dependencies and scripts
```

## 🎨 Core Web Vitals Thresholds

The app uses the latest 2024-2025 standards:

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | 2.5s - 4.0s | > 4.0s |
| **INP** (Interaction to Next Paint)* | ≤ 200ms | 200ms - 500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | 0.1 - 0.25 | > 0.25 |
| **FCP** (First Contentful Paint) | ≤ 1.8s | 1.8s - 3.0s | > 3.0s |
| **TBT** (Total Blocking Time) | ≤ 200ms | 200ms - 600ms | > 600ms |

*TBT is used in lab testing as a proxy for INP

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mustafapiplodi/page-analyzer)

Or manually:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables on Vercel

Add your `PAGESPEED_API_KEY` in Vercel dashboard:
1. Go to Project Settings > Environment Variables
2. Add `PAGESPEED_API_KEY` with your API key
3. Redeploy

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

## 🔧 Configuration

### Vite Configuration

The `vite.config.js` is pre-configured with:
- React plugin with Fast Refresh
- Optimized build settings
- Source maps for debugging

### Vercel Configuration

The `vercel.json` defines:
- Build and output settings
- API routes mapping

## 📊 API Response Structure

The serverless API returns:

```json
{
  "url": "https://example.com",
  "strategy": "mobile",
  "timestamp": 1234567890,
  "performanceScore": 85,
  "metrics": {
    "lcp": { "value": 2400, "displayValue": "2.4 s", "score": 0.92 },
    "cls": { "value": 0.05, "displayValue": "0.05", "score": 0.98 },
    "tbt": { "value": 150, "displayValue": "150 ms", "score": 0.95 },
    "fcp": { "value": 1600, "displayValue": "1.6 s", "score": 0.94 },
    "speedIndex": { "value": 3200, "displayValue": "3.2 s", "score": 0.89 }
  },
  "opportunities": [...],
  "fieldData": {...}
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Google PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Chart.js](https://www.chartjs.org/)
- Core Web Vitals color scheme from Google

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

## 🔮 Roadmap

- [ ] Add historical tracking with database
- [ ] Implement comparison features (before/after, competitors)
- [ ] Add export to PDF/CSV
- [ ] Batch testing for multiple URLs
- [ ] User authentication and saved tests
- [ ] Dark mode
- [ ] PWA features

---

Made with ❤️ by [Mustafa Piplodi](https://github.com/mustafapiplodi)
