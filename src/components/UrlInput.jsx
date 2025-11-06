import { useState } from 'react';
import './UrlInput.css';

export default function UrlInput({ onAnalyze, loading }) {
  const [url, setUrl] = useState('');
  const [strategy, setStrategy] = useState('mobile');
  const [error, setError] = useState('');

  const validateUrl = (urlString) => {
    try {
      const urlObj = new URL(urlString);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL (including http:// or https://)');
      return;
    }

    onAnalyze(url, strategy);
  };

  return (
    <div className="url-input-container">
      <div className="hero-section">
        <h1>Website Speed Test</h1>
        <p className="subtitle">
          Analyze your website performance and get actionable insights based on Google's Core Web Vitals
        </p>
      </div>

      <form onSubmit={handleSubmit} className="url-form">
        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL (e.g., https://example.com)"
              className="url-input"
              disabled={loading}
            />
            <button
              type="submit"
              className="analyze-button"
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="strategy-selector">
          <label className="strategy-label">
            <input
              type="radio"
              value="mobile"
              checked={strategy === 'mobile'}
              onChange={(e) => setStrategy(e.target.value)}
              disabled={loading}
            />
            <span className="strategy-text">
              📱 Mobile
            </span>
          </label>
          <label className="strategy-label">
            <input
              type="radio"
              value="desktop"
              checked={strategy === 'desktop'}
              onChange={(e) => setStrategy(e.target.value)}
              disabled={loading}
            />
            <span className="strategy-text">
              💻 Desktop
            </span>
          </label>
        </div>
      </form>

      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Analyzing page performance...</p>
          <p className="loading-subtext">This may take 10-30 seconds</p>
        </div>
      )}
    </div>
  );
}
