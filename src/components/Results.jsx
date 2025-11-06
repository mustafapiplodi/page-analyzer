import PerformanceScore from './PerformanceScore';
import CoreWebVitals from './CoreWebVitals';
import Opportunities from './Opportunities';
import './Results.css';

export default function Results({ data }) {
  if (!data) return null;

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Analysis Results</h2>
        <div className="analyzed-url">
          <span className="url-label">Analyzed URL:</span>
          <a href={data.url} target="_blank" rel="noopener noreferrer" className="url-link">
            {data.url}
          </a>
        </div>
        <div className="test-info">
          <span className="test-strategy">
            {data.strategy === 'mobile' ? '📱 Mobile' : '💻 Desktop'}
          </span>
          <span className="test-time">
            {new Date(data.timestamp).toLocaleString()}
          </span>
        </div>
      </div>

      <PerformanceScore score={data.performanceScore} />

      <CoreWebVitals metrics={data.metrics} />

      {data.opportunities && data.opportunities.length > 0 && (
        <Opportunities opportunities={data.opportunities} />
      )}

      {data.fieldData && (
        <div className="field-data-notice">
          <div className="notice-icon">ℹ️</div>
          <div>
            <strong>Real User Data Available</strong>
            <p>
              This site has sufficient traffic for Chrome User Experience Report (CrUX) field data.
              Field data shows real-world performance from actual users over the past 28 days.
            </p>
          </div>
        </div>
      )}

      <div className="results-footer">
        <button
          className="new-test-button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Test Another URL
        </button>
      </div>
    </div>
  );
}
