import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertCircle, Loader2, Smartphone, Monitor } from 'lucide-react';
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

      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter website URL (e.g., https://example.com)"
                  disabled={loading}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing
                    </>
                  ) : (
                    'Analyze'
                  )}
                </Button>
              </div>
              {error && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label>Test Strategy</Label>
              <RadioGroup
                value={strategy}
                onValueChange={setStrategy}
                disabled={loading}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mobile" id="mobile" />
                  <Label htmlFor="mobile" className="flex items-center gap-2 cursor-pointer font-normal">
                    <Smartphone className="h-4 w-4" />
                    Mobile
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="desktop" id="desktop" />
                  <Label htmlFor="desktop" className="flex items-center gap-2 cursor-pointer font-normal">
                    <Monitor className="h-4 w-4" />
                    Desktop
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </form>
        </CardContent>
      </Card>

      {loading && (
        <Card className="max-w-2xl mx-auto mt-6">
          <CardContent className="flex flex-col items-center py-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-medium">Analyzing page performance...</p>
            <p className="text-sm text-muted-foreground mt-2">This may take 10-30 seconds</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
