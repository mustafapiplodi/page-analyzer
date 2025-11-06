import './CoreWebVitals.css';

export default function CoreWebVitals({ metrics }) {
  const getMetricColor = (metricName, value) => {
    const thresholds = {
      lcp: { good: 2500, poor: 4000 },
      cls: { good: 0.1, poor: 0.25 },
      fcp: { good: 1800, poor: 3000 },
      tbt: { good: 200, poor: 600 },
      speedIndex: { good: 3400, poor: 5800 }
    };

    const threshold = thresholds[metricName];
    if (!threshold) return '#999';

    if (value <= threshold.good) return '#0CCE6B';
    if (value <= threshold.poor) return '#FFA400';
    return '#FF4E42';
  };

  const getMetricStatus = (metricName, value) => {
    const thresholds = {
      lcp: { good: 2500, poor: 4000 },
      cls: { good: 0.1, poor: 0.25 },
      fcp: { good: 1800, poor: 3000 },
      tbt: { good: 200, poor: 600 },
      speedIndex: { good: 3400, poor: 5800 }
    };

    const threshold = thresholds[metricName];
    if (!threshold) return 'Unknown';

    if (value <= threshold.good) return 'Good';
    if (value <= threshold.poor) return 'Needs Improvement';
    return 'Poor';
  };

  const metricInfo = {
    lcp: {
      name: 'Largest Contentful Paint',
      description: 'Measures loading performance. Good LCP is ≤2.5s',
      icon: '⚡'
    },
    cls: {
      name: 'Cumulative Layout Shift',
      description: 'Measures visual stability. Good CLS is ≤0.1',
      icon: '📐'
    },
    fcp: {
      name: 'First Contentful Paint',
      description: 'Time until first content appears. Good FCP is ≤1.8s',
      icon: '🎨'
    },
    tbt: {
      name: 'Total Blocking Time',
      description: 'Measures interactivity. Good TBT is ≤200ms (proxy for INP)',
      icon: '⏱️'
    },
    speedIndex: {
      name: 'Speed Index',
      description: 'How quickly content is visually displayed. Good SI is ≤3.4s',
      icon: '🚀'
    }
  };

  return (
    <div className="core-web-vitals-container">
      <h2 className="vitals-title">Core Web Vitals & Performance Metrics</h2>
      <p className="vitals-subtitle">Lab data from Lighthouse</p>

      <div className="metrics-grid">
        {Object.entries(metrics).map(([key, metric]) => {
          const info = metricInfo[key];
          if (!info) return null;

          const color = getMetricColor(key, metric.value);
          const status = getMetricStatus(key, metric.value);

          return (
            <div key={key} className="metric-card">
              <div className="metric-header">
                <span className="metric-icon">{info.icon}</span>
                <h3 className="metric-name">{info.name}</h3>
              </div>

              <div className="metric-value-container">
                <div
                  className="metric-value"
                  style={{ color }}
                >
                  {metric.displayValue}
                </div>
                <div
                  className="metric-status"
                  style={{ color }}
                >
                  {status}
                </div>
              </div>

              <p className="metric-description">{info.description}</p>

              <div className="metric-bar">
                <div
                  className="metric-bar-fill"
                  style={{
                    width: `${metric.score * 100}%`,
                    backgroundColor: color
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="vitals-info">
        <h3>Understanding Core Web Vitals</h3>
        <ul>
          <li><strong>LCP</strong> - The three official Core Web Vitals are LCP, INP, and CLS</li>
          <li><strong>Lab vs Field</strong> - Lab data (shown here) is from controlled testing. Field data comes from real users</li>
          <li><strong>TBT vs INP</strong> - TBT is used in lab testing as a proxy for INP (Interaction to Next Paint)</li>
        </ul>
      </div>
    </div>
  );
}
