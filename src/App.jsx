import { useState } from 'react';
import UrlInput from './components/UrlInput';
import Results from './components/Results';
import AboutSection from './components/AboutSection';
import Header from './components/Header';
import LoadingProgress from './components/LoadingProgress';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [mobileResults, setMobileResults] = useState(null);
  const [desktopResults, setDesktopResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (url, strategy, retryCount = 0) => {
    setLoading(true);
    setError(null);

    const maxRetries = 3;
    const retryDelay = (attempt) => Math.min(1000 * Math.pow(2, attempt), 8000); // Exponential backoff: 2s, 4s, 8s

    try {
      // Use production API if in development mode, otherwise use local endpoint
      const apiUrl = import.meta.env.DEV
        ? 'https://page-speed-analyzer.vercel.app/api/pagespeed'
        : '/api/pagespeed';

      // Call our serverless API endpoint
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, strategy }),
      });

      const data = await response.json();

      // Handle rate limiting with retry
      if (response.status === 429) {
        if (retryCount < maxRetries) {
          const delay = retryDelay(retryCount);
          setError(`Rate limit reached. Retrying in ${delay / 1000} seconds... (Attempt ${retryCount + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return handleAnalyze(url, strategy, retryCount + 1);
        }
        throw new Error(data.error || 'Rate limit exceeded. Please try again later.');
      }

      // Handle server errors with retry
      if (response.status >= 500 && response.status < 600) {
        if (retryCount < maxRetries) {
          const delay = retryDelay(retryCount);
          setError(`Server error. Retrying in ${delay / 1000} seconds... (Attempt ${retryCount + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return handleAnalyze(url, strategy, retryCount + 1);
        }
        throw new Error('Server is experiencing issues. Please try again later.');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze page');
      }

      setResults(data);

      // Store results by strategy for comparison
      if (strategy === 'mobile') {
        setMobileResults(data);
        // Automatically start desktop test after mobile completes
        // Only if this is the first mobile test (not a retry from comparison view)
        if (retryCount === 0) {
          setTimeout(() => {
            handleAnalyze(url, 'desktop');
          }, 500);
        }
      } else {
        setDesktopResults(data);
      }
    } catch (err) {
      // Network errors - retry
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        if (retryCount < maxRetries) {
          const delay = retryDelay(retryCount);
          setError(`Network error. Retrying in ${delay / 1000} seconds... (Attempt ${retryCount + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return handleAnalyze(url, strategy, retryCount + 1);
        }
        setError('Network connection failed. Please check your internet connection and try again.');
      } else {
        setError(err.message || 'An unexpected error occurred. Please try again.');
      }
      console.error('Error analyzing page:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />

      <div className="app-content">
        <UrlInput onAnalyze={handleAnalyze} loading={loading} />

        {loading && (
          <LoadingProgress
            mobileComplete={!!mobileResults}
            desktopComplete={!!desktopResults}
          />
        )}

        {error && (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="mt-6 border-destructive/50 bg-destructive/10">
              <CardContent className="flex items-start gap-3 p-4">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-destructive mb-1">Error</h3>
                  <p className="text-sm text-destructive/90">{error}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {results && (
          <Results
            data={results}
            onAnalyze={handleAnalyze}
            mobileResults={mobileResults}
            desktopResults={desktopResults}
          />
        )}

        {/* Show About section when no results */}
        {!results && !loading && <AboutSection />}
      </div>

      <footer className="app-footer">
        <div className="max-w-4xl mx-auto space-y-4 text-center">
          <div className="space-y-3">
            <p className="text-lg font-medium">
              Powered by <a href="https://developers.google.com/speed/docs/insights/v5/get-started" target="_blank" rel="noopener noreferrer">Google PageSpeed Insights API v5</a>
            </p>
            <p className="footer-note max-w-2xl mx-auto">
              Analyze your website's performance based on Google's Core Web Vitals standards
            </p>
          </div>
          <div className="pt-4 border-t border-white/30 mt-6 mx-auto max-w-md">
            <p className="text-base">
              Built with excellence by <a href="https://www.scalinghigh.com" target="_blank" rel="noopener noreferrer" className="font-bold">Scaling High Technologies</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
