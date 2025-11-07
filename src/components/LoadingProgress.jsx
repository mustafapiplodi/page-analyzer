import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2, CheckCircle2, Smartphone, Monitor, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function LoadingProgress({ mobileComplete = false, desktopComplete = false }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('Initializing...');
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Derive status from props
  const mobileStatus = mobileComplete ? 'complete' : 'in-progress';
  const desktopStatus = desktopComplete ? 'complete' : mobileComplete ? 'in-progress' : 'waiting';

  useEffect(() => {
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTimeElapsed(elapsed);

      // Progress stages - Mobile first (0-50%), then Desktop (50-100%)
      if (!mobileComplete) {
        // Mobile testing phase
        if (elapsed < 5) {
          setProgress(Math.min((elapsed / 5) * 10, 10));
          setStage('Testing Mobile: Connecting to PageSpeed API...');
        } else if (elapsed < 12) {
          setProgress(10 + Math.min(((elapsed - 5) / 7) * 20, 20));
          setStage('Testing Mobile: Analyzing performance...');
        } else if (elapsed < 20) {
          setProgress(30 + Math.min(((elapsed - 12) / 8) * 15, 15));
          setStage('Testing Mobile: Checking accessibility...');
        } else {
          setProgress(45 + Math.min(((elapsed - 20) / 5) * 5, 5));
          setStage('Testing Mobile: Finalizing results...');
        }
      } else if (!desktopComplete) {
        // Desktop testing phase
        if (elapsed < 5) {
          setProgress(50 + Math.min((elapsed / 5) * 10, 10));
          setStage('Testing Desktop: Connecting to PageSpeed API...');
        } else if (elapsed < 12) {
          setProgress(60 + Math.min(((elapsed - 5) / 7) * 20, 20));
          setStage('Testing Desktop: Analyzing performance...');
        } else if (elapsed < 20) {
          setProgress(80 + Math.min(((elapsed - 12) / 8) * 10, 10));
          setStage('Testing Desktop: Checking accessibility...');
        } else {
          setProgress(90 + Math.min(((elapsed - 20) / 5) * 10, 10));
          setStage('Finalizing desktop report...');
        }
      }
    }, 100);

    return () => clearInterval(timer);
  }, [mobileComplete, desktopComplete]);

  const estimatedTimeRemaining = Math.max(0, 60 - timeElapsed);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <Loader2 className="h-16 w-16 mx-auto mb-4 text-primary animate-spin" />
            <h3 className="text-2xl font-bold mb-2">Analyzing Mobile & Desktop Performance</h3>
            <p className="text-muted-foreground">Testing both platforms (30-60 seconds total)</p>
          </div>

          {/* Device Status Indicators */}
          <div className="flex gap-4 justify-center mb-6">
            {/* Mobile Status */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              mobileStatus === 'in-progress'
                ? 'bg-primary/10 border-primary/30'
                : mobileStatus === 'complete'
                ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800'
                : 'bg-background'
            }`}>
              <Smartphone className={`h-4 w-4 ${
                mobileStatus === 'in-progress'
                  ? 'text-primary'
                  : mobileStatus === 'complete'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-muted-foreground'
              }`} />
              <span className="text-sm font-medium">Mobile</span>
              {mobileStatus === 'in-progress' && (
                <Loader2 className="h-3 w-3 animate-spin text-primary" />
              )}
              {mobileStatus === 'complete' && (
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              )}
            </div>

            {/* Desktop Status */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              desktopStatus === 'in-progress'
                ? 'bg-primary/10 border-primary/30'
                : desktopStatus === 'complete'
                ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800'
                : 'bg-background'
            }`}>
              <Monitor className={`h-4 w-4 ${
                desktopStatus === 'in-progress'
                  ? 'text-primary'
                  : desktopStatus === 'complete'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-muted-foreground'
              }`} />
              <span className="text-sm font-medium">Desktop</span>
              {desktopStatus === 'waiting' && (
                <Badge variant="outline" className="text-xs">Waiting</Badge>
              )}
              {desktopStatus === 'in-progress' && (
                <Loader2 className="h-3 w-3 animate-spin text-primary" />
              )}
              {desktopStatus === 'complete' && (
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">{stage}</span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            <div className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Time elapsed: {timeElapsed}s</span>
              </div>
              <span>Est. remaining: ~{estimatedTimeRemaining}s</span>
            </div>

            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                Running comprehensive tests on both mobile and desktop including performance, accessibility, SEO, and best practices analysis.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
