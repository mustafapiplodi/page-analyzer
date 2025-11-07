import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Smartphone, Monitor, ArrowRight, TrendingUp, TrendingDown } from "lucide-react";

export default function MobileDesktopComparison({ mobileResults, desktopResults, onAnalyze, currentUrl }) {
  // If we have both results, show comparison
  if (mobileResults && desktopResults && mobileResults.url === desktopResults.url) {
    return (
      <Card className="mt-6 border-primary/30 bg-gradient-to-br from-primary/5 to-purple-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-primary" />
            <Smartphone className="h-5 w-5 text-primary" />
            Mobile vs Desktop Comparison
          </CardTitle>
          <CardDescription>
            Performance differences between mobile and desktop testing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Mobile Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-lg">Mobile</h3>
              </div>

              <MetricComparison
                label="Performance"
                mobileValue={mobileResults.performanceScore}
                desktopValue={desktopResults.performanceScore}
                isMobile
              />
              <MetricComparison
                label="Accessibility"
                mobileValue={mobileResults.accessibilityScore}
                desktopValue={desktopResults.accessibilityScore}
                isMobile
              />
              <MetricComparison
                label="Best Practices"
                mobileValue={mobileResults.bestPracticesScore}
                desktopValue={desktopResults.bestPracticesScore}
                isMobile
              />
              <MetricComparison
                label="SEO"
                mobileValue={mobileResults.seoScore}
                desktopValue={desktopResults.seoScore}
                isMobile
              />

              {/* Core Web Vitals */}
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3 text-sm">Core Web Vitals</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">LCP:</span>
                    <span className="font-medium">{mobileResults.metrics.lcp.displayValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CLS:</span>
                    <span className="font-medium">{mobileResults.metrics.cls.displayValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">TBT:</span>
                    <span className="font-medium">{mobileResults.metrics.tbt.displayValue}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Monitor className="h-5 w-5 text-purple-500" />
                <h3 className="font-semibold text-lg">Desktop</h3>
              </div>

              <MetricComparison
                label="Performance"
                mobileValue={mobileResults.performanceScore}
                desktopValue={desktopResults.performanceScore}
                isMobile={false}
              />
              <MetricComparison
                label="Accessibility"
                mobileValue={mobileResults.accessibilityScore}
                desktopValue={desktopResults.accessibilityScore}
                isMobile={false}
              />
              <MetricComparison
                label="Best Practices"
                mobileValue={mobileResults.bestPracticesScore}
                desktopValue={desktopResults.bestPracticesScore}
                isMobile={false}
              />
              <MetricComparison
                label="SEO"
                mobileValue={mobileResults.seoScore}
                desktopValue={desktopResults.seoScore}
                isMobile={false}
              />

              {/* Core Web Vitals */}
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3 text-sm">Core Web Vitals</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">LCP:</span>
                    <span className="font-medium">{desktopResults.metrics.lcp.displayValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CLS:</span>
                    <span className="font-medium">{desktopResults.metrics.cls.displayValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">TBT:</span>
                    <span className="font-medium">{desktopResults.metrics.tbt.displayValue}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-sm">Key Insights</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>
                • {mobileResults.performanceScore > desktopResults.performanceScore
                  ? 'Mobile performance is better than desktop'
                  : 'Desktop performance is better than mobile'}
              </li>
              <li>
                • Mobile typically shows lower scores due to network throttling and slower CPU
              </li>
              <li>
                • Focus on optimizing for mobile-first as it represents 60%+ of web traffic
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show call-to-action to run the other test
  const hasMobile = !!mobileResults && mobileResults.url === currentUrl;
  const hasDesktop = !!desktopResults && desktopResults.url === currentUrl;

  if (!hasMobile || !hasDesktop) {
    const missingStrategy = hasMobile ? 'desktop' : 'mobile';

    return (
      <Card className="mt-6 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-primary" />
            <Smartphone className="h-5 w-5 text-primary" />
            Mobile vs Desktop Comparison
          </CardTitle>
          <CardDescription>
            Compare performance across different devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Run a {missingStrategy} test to compare performance across devices
            </p>
            <Button
              onClick={() => onAnalyze(currentUrl, missingStrategy)}
              className="gap-2"
            >
              {missingStrategy === 'mobile' ? (
                <>
                  <Smartphone className="h-4 w-4" />
                  Test Mobile
                </>
              ) : (
                <>
                  <Monitor className="h-4 w-4" />
                  Test Desktop
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}

// Helper component for metric comparison
function MetricComparison({ label, mobileValue, desktopValue, isMobile }) {
  const value = isMobile ? mobileValue : desktopValue;
  const otherValue = isMobile ? desktopValue : mobileValue;
  const diff = value - otherValue;

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-good';
    if (score >= 50) return 'text-warning';
    return 'text-poor';
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`text-xl font-bold ${getScoreColor(value)}`}>
          {value}
        </span>
        {diff !== 0 && (
          <div className="flex items-center gap-1">
            {diff > 0 ? (
              <TrendingUp className="h-4 w-4 text-good" />
            ) : (
              <TrendingDown className="h-4 w-4 text-poor" />
            )}
            <span className={`text-xs ${diff > 0 ? 'text-good' : 'text-poor'}`}>
              {Math.abs(diff)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
