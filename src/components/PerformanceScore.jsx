import { useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, TrendingUp, TrendingDown } from 'lucide-react';

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

export default function PerformanceScore({ score }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const getScoreColor = (score) => {
    if (score >= 90) return '#0CCE6B'; // Good (green)
    if (score >= 50) return '#FFA400'; // Needs improvement (orange)
    return '#FF4E42'; // Poor (red)
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Fast';
    if (score >= 50) return 'Needs Improvement';
    return 'Slow';
  };

  const getScoreVariant = (score) => {
    if (score >= 90) return 'good';
    if (score >= 50) return 'warning';
    return 'poor';
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    const scoreColor = getScoreColor(score);

    chartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [score, 100 - score],
          backgroundColor: [scoreColor, 'hsl(var(--muted))'],
          borderWidth: 0,
          circumference: 180,
          rotation: 270
        }]
      },
      options: {
        cutout: '75%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      },
      plugins: [{
        id: 'centerText',
        beforeDraw: (chart) => {
          const ctx = chart.ctx;
          const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
          const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2 + 20;

          ctx.save();

          // Draw score
          ctx.font = 'bold 48px system-ui, -apple-system, sans-serif';
          ctx.fillStyle = scoreColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(Math.round(score), centerX, centerY);

          ctx.restore();
        }
      }]
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [score]);

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <CardTitle>Performance Score</CardTitle>
          </div>
          <Badge variant={getScoreVariant(score)}>
            {getScoreLabel(score)}
          </Badge>
        </div>
        <CardDescription>
          Overall performance based on Google's PageSpeed Insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-xs h-48 mb-6">
            <canvas ref={canvasRef}></canvas>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full">
            <div className="flex items-start gap-2 p-3 rounded-lg bg-good/10 border border-good/20">
              <div className="h-3 w-3 rounded-full bg-good mt-1 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-good">Fast</div>
                <div className="text-xs text-muted-foreground">90-100</div>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-warning/10 border border-warning/20">
              <div className="h-3 w-3 rounded-full bg-warning mt-1 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-warning">Moderate</div>
                <div className="text-xs text-muted-foreground">50-89</div>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-poor/10 border border-poor/20">
              <div className="h-3 w-3 rounded-full bg-poor mt-1 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-poor">Slow</div>
                <div className="text-xs text-muted-foreground">0-49</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
