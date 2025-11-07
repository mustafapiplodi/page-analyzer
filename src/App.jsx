import { useState } from 'react';
import UrlInput from './components/UrlInput';
import Results from './components/Results';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (url, strategy) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Call our serverless API endpoint
      const response = await fetch('/api/pagespeed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, strategy }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze page');
      }

      setResults(data);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
      console.error('Error analyzing page:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <UrlInput onAnalyze={handleAnalyze} loading={loading} />

      {error && (
        <Card className="max-w-2xl mx-auto mt-6 border-destructive/50 bg-destructive/10">
          <CardContent className="flex items-start gap-3 p-4">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-destructive mb-1">Error</h3>
              <p className="text-sm text-destructive/90">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {results && <Results data={results} />}

      <footer className="app-footer">
        <p>
          Powered by <a href="https://developers.google.com/speed/docs/insights/v5/get-started" target="_blank" rel="noopener noreferrer">Google PageSpeed Insights API v5</a>
        </p>
        <p className="footer-note">
          Analyze your website's performance based on Google's Core Web Vitals standards
        </p>
      </footer>
    </div>
  );
}

export default App;
