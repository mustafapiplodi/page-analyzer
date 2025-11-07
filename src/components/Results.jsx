import { useState } from 'react';
import PerformanceScore from './PerformanceScore';
import CoreWebVitals from './CoreWebVitals';
import Opportunities from './Opportunities';
import AccessibilityScore from './AccessibilityScore';
import SmartRecommendations from './SmartRecommendations';
import CompetitorComparison from './CompetitorComparison';
import Screenshot from './Screenshot';
import QuickWins from './QuickWins';
import ResourceBreakdown from './ResourceBreakdown';
import SEOAnalysis from './SEOAnalysis';
import ExportPDF from './ExportPDF';
import MobileDesktopComparison from './MobileDesktopComparison';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, Smartphone, Monitor } from 'lucide-react';

export default function Results({ data, onAnalyze, mobileResults, desktopResults }) {
  const [activeTab, setActiveTab] = useState('mobile');

  if (!mobileResults && !desktopResults) return null;

  // Determine which result to show based on active tab
  const currentData = activeTab === 'mobile' ? mobileResults : desktopResults;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="mt-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold">Analysis Results</h2>
            <ExportPDF mobileData={mobileResults} desktopData={desktopResults} />
          </div>
          {currentData && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Analyzed URL:</span>
                <a
                  href={currentData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline break-all"
                >
                  {currentData.url}
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {new Date(currentData.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabs for Mobile/Desktop */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="mobile" className="gap-2">
            <Smartphone className="h-4 w-4" />
            Mobile
            {mobileResults && (
              <Badge variant="secondary" className="ml-2">
                {mobileResults.performanceScore}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="desktop" className="gap-2" disabled={!desktopResults}>
            <Monitor className="h-4 w-4" />
            Desktop
            {desktopResults && (
              <Badge variant="secondary" className="ml-2">
                {desktopResults.performanceScore}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mobile" className="mt-6">
          {mobileResults && <ResultsContent data={mobileResults} />}
        </TabsContent>

        <TabsContent value="desktop" className="mt-6">
          {desktopResults && <ResultsContent data={desktopResults} />}
        </TabsContent>
      </Tabs>

      {/* Mobile vs Desktop Comparison - Always visible at bottom */}
      {mobileResults && desktopResults && (
        <>
          <MobileDesktopComparison
            mobileResults={mobileResults}
            desktopResults={desktopResults}
            onAnalyze={onAnalyze}
            currentUrl={mobileResults.url}
          />

          {/* Competitor Analysis */}
          <CompetitorComparison
            mobileResults={mobileResults}
            desktopResults={desktopResults}
            onAnalyze={onAnalyze}
          />
        </>
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

// Separate component for rendering individual result content
function ResultsContent({ data }) {
  return (
    <>
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
      <Screenshot screenshot={data.screenshot} strategy={data.strategy} />

      {/* Quick Wins Section */}
      {data.opportunities && data.opportunities.length > 0 && (
        <QuickWins opportunities={data.opportunities} />
      )}

      {/* Resource Breakdown */}
      <ResourceBreakdown breakdown={data.resourceBreakdown} />

      {/* SEO Analysis */}
      <SEOAnalysis seoScore={data.seoScore} seoIssues={data.seoIssues} />

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
    </>
  );
}
