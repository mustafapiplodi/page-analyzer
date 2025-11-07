import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';

export default function LoadingProgress() {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('Initializing...');
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTimeElapsed(elapsed);

      // Progress stages based on typical API response time
      if (elapsed < 5) {
        setProgress(Math.min((elapsed / 5) * 15, 15));
        setStage('Connecting to Google PageSpeed API...');
      } else if (elapsed < 10) {
        setProgress(15 + Math.min(((elapsed - 5) / 5) * 20, 20));
        setStage('Analyzing page performance...');
      } else if (elapsed < 20) {
        setProgress(35 + Math.min(((elapsed - 10) / 10) * 35, 35));
        setStage('Checking accessibility and best practices...');
      } else if (elapsed < 25) {
        setProgress(70 + Math.min(((elapsed - 20) / 5) * 15, 15));
        setStage('Generating recommendations...');
      } else {
        setProgress(85 + Math.min(((elapsed - 25) / 5) * 10, 10));
        setStage('Finalizing report...');
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const estimatedTimeRemaining = Math.max(0, 29 - timeElapsed);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <Loader2 className="h-16 w-16 mx-auto mb-4 text-primary animate-spin" />
            <h3 className="text-2xl font-bold mb-2">Analyzing page performance...</h3>
            <p className="text-muted-foreground">This may take 10-30 seconds</p>
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
              <span>Time elapsed: {timeElapsed}s</span>
              <span>Est. remaining: ~{estimatedTimeRemaining}s</span>
            </div>

            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                We're running comprehensive tests including performance, accessibility, and best practices analysis.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
