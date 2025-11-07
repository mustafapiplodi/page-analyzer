import PerformanceScore from './PerformanceScore';
import CoreWebVitals from './CoreWebVitals';
import Opportunities from './Opportunities';
import AccessibilityScore from './AccessibilityScore';
import SmartRecommendations from './SmartRecommendations';
import CompetitorComparison from './CompetitorComparison';
import Screenshot from './Screenshot';
import QuickWins from './QuickWins';
import ResourceBreakdown from './ResourceBreakdown';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

export default function Results({ data, onAnalyze }) {
  if (!data) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="mt-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Analyzed URL:</span>
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline break-all"
              >
                {data.url}
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline" className="bg-background">
                {data.strategy === 'mobile' ? '📱 Mobile' : '💻 Desktop'}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {new Date(data.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Combined Accessibility + Performance Score */}
      {data.accessibilityScore !== undefined && data.bestPracticesScore !== undefined ? (
        <AccessibilityScore
          accessibilityScore={data.accessibilityScore}
          performanceScore={data.performanceScore}
          bestPracticesScore={data.bestPracticesScore}
          seoScore={data.seoScore}
          accessibilityIssues={data.accessibilityIssues || []}
        />
      ) : (
        <PerformanceScore score={data.performanceScore} />
      )}

      <CoreWebVitals metrics={data.metrics} />

      {/* Page Screenshot */}
      <Screenshot screenshot={data.screenshot} />

      {/* Quick Wins Section */}
      {data.opportunities && data.opportunities.length > 0 && (
        <QuickWins opportunities={data.opportunities} />
      )}

      {/* Resource Breakdown */}
      <ResourceBreakdown breakdown={data.resourceBreakdown} />

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
          metrics: data.metrics,
          strategy: data.strategy
        }}
        onAnalyze={onAnalyze}
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

      <div className="flex justify-center mt-8 mb-6">
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          size="lg"
          className="min-w-[200px]"
        >
          Test Another URL
        </Button>
      </div>
    </div>
  );
}
