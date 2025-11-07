import PerformanceScore from './PerformanceScore';
import CoreWebVitals from './CoreWebVitals';
import Opportunities from './Opportunities';
import AccessibilityScore from './AccessibilityScore';
import SmartRecommendations from './SmartRecommendations';
import CompetitorComparison from './CompetitorComparison';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
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
          <Badge variant="outline">
            {data.strategy === 'mobile' ? '📱 Mobile' : '💻 Desktop'}
          </Badge>
          <span className="test-time">
            {new Date(data.timestamp).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Combined Accessibility + Performance Score */}
      {data.accessibilityScore !== undefined && data.bestPracticesScore !== undefined ? (
        <AccessibilityScore
          accessibilityScore={data.accessibilityScore}
          performanceScore={data.performanceScore}
          bestPracticesScore={data.bestPracticesScore}
          accessibilityIssues={data.accessibilityIssues || []}
        />
      ) : (
        <PerformanceScore score={data.performanceScore} />
      )}

      <CoreWebVitals metrics={data.metrics} />

      {/* Smart Recommendations with Framework Detection */}
      {data.detectedStack && data.opportunities && data.opportunities.length > 0 ? (
        <SmartRecommendations
          opportunities={data.opportunities}
          detectedStack={data.detectedStack}
        />
      ) : (
        data.opportunities && data.opportunities.length > 0 && (
          <Opportunities opportunities={data.opportunities} />
        )
      )}

      {/* Competitor Comparison */}
      <CompetitorComparison
        currentSite={{
          url: data.url,
          performanceScore: data.performanceScore,
          metrics: data.metrics
        }}
      />

      {data.fieldData && (
        <Card className="mt-6 border-primary/20 bg-primary/5">
          <CardContent className="flex items-start gap-3 p-4">
            <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <strong className="block mb-1">Real User Data Available</strong>
              <p className="text-sm text-muted-foreground">
                This site has sufficient traffic for Chrome User Experience Report (CrUX) field data.
                Field data shows real-world performance from actual users over the past 28 days.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="results-footer">
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          size="lg"
        >
          Test Another URL
        </Button>
      </div>
    </div>
  );
}
