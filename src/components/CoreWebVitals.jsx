import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Gauge, Layout, Paintbrush, Timer, Rocket, Info, HelpCircle } from 'lucide-react';

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
    if (!threshold) return 'text-muted-foreground';

    if (value <= threshold.good) return 'text-good';
    if (value <= threshold.poor) return 'text-warning';
    return 'text-poor';
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

  const getMetricVariant = (metricName, value) => {
    const thresholds = {
      lcp: { good: 2500, poor: 4000 },
      cls: { good: 0.1, poor: 0.25 },
      fcp: { good: 1800, poor: 3000 },
      tbt: { good: 200, poor: 600 },
      speedIndex: { good: 3400, poor: 5800 }
    };

    const threshold = thresholds[metricName];
    if (!threshold) return 'secondary';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'warning';
    return 'poor';
  };

  const getProgressColor = (metricName, value) => {
    const thresholds = {
      lcp: { good: 2500, poor: 4000 },
      cls: { good: 0.1, poor: 0.25 },
      fcp: { good: 1800, poor: 3000 },
      tbt: { good: 200, poor: 600 },
      speedIndex: { good: 3400, poor: 5800 }
    };

    const threshold = thresholds[metricName];
    if (!threshold) return 'bg-secondary';

    if (value <= threshold.good) return 'bg-good';
    if (value <= threshold.poor) return 'bg-warning';
    return 'bg-poor';
  };

  const metricInfo = {
    lcp: {
      name: 'Largest Contentful Paint',
      description: 'Measures loading performance. Good LCP is ≤2.5s',
      tooltip: 'LCP marks the time when the largest image or text block visible in the viewport is rendered. It\'s one of the three Core Web Vitals and critical for SEO.',
      icon: Gauge
    },
    cls: {
      name: 'Cumulative Layout Shift',
      description: 'Measures visual stability. Good CLS is ≤0.1',
      tooltip: 'CLS measures unexpected layout shifts during page load. A good score means your page doesn\'t jump around while loading, improving user experience.',
      icon: Layout
    },
    fcp: {
      name: 'First Contentful Paint',
      description: 'Time until first content appears. Good FCP is ≤1.8s',
      tooltip: 'FCP measures when the first text, image, or canvas element appears. It\'s the first signal to users that your page is loading.',
      icon: Paintbrush
    },
    tbt: {
      name: 'Total Blocking Time',
      description: 'Measures interactivity. Good TBT is ≤200ms (proxy for INP)',
      tooltip: 'TBT measures how long the main thread was blocked, preventing user interaction. It\'s used in lab testing as a proxy for INP (Interaction to Next Paint).',
      icon: Timer
    },
    speedIndex: {
      name: 'Speed Index',
      description: 'How quickly content is visually displayed. Good SI is ≤3.4s',
      tooltip: 'Speed Index shows how quickly the contents of a page are visibly populated. Lower values are better.',
      icon: Rocket
    }
  };

  return (
    <TooltipProvider>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Core Web Vitals & Performance Metrics</CardTitle>
          <CardDescription>Lab data from Lighthouse testing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(metrics).map(([key, metric]) => {
              const info = metricInfo[key];
              if (!info) return null;

              const Icon = info.icon;
              const color = getMetricColor(key, metric.value);
              const status = getMetricStatus(key, metric.value);
              const variant = getMetricVariant(key, metric.value);
              const progressColor = getProgressColor(key, metric.value);

              return (
                <Card key={key} className="border-2 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <Badge variant={variant} className="text-xs">
                        {status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <CardTitle className="text-sm font-medium leading-tight">
                        {info.name}
                      </CardTitle>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>{info.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </CardHeader>
                <CardContent className="space-y-3">
                  <div className={`text-3xl font-bold ${color}`}>
                    {metric.displayValue}
                  </div>

                  <Progress
                    value={metric.score * 100}
                    className="h-2"
                    indicatorClassName={progressColor}
                  />

                  <p className="text-xs text-muted-foreground leading-tight">
                    {info.description}
                  </p>
                </CardContent>
              </Card>
            );
            })}
          </div>

          <Card className="mt-6 bg-muted/50 border-muted">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Understanding Core Web Vitals</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>LCP</strong> - The three official Core Web Vitals are LCP, INP, and CLS</li>
                  <li>• <strong>Lab vs Field</strong> - Lab data (shown here) is from controlled testing. Field data comes from real users</li>
                  <li>• <strong>TBT vs INP</strong> - TBT is used in lab testing as a proxy for INP (Interaction to Next Paint)</li>
                </ul>
              </div>
            </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
