import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Copy, Check, Clock } from "lucide-react";
import { useState } from "react";

export default function QuickWins({ opportunities }) {
  const [copiedId, setCopiedId] = useState(null);

  // Filter for quick wins: high impact (>500ms savings) + easy implementation
  const quickWins = opportunities
    .filter(opp => {
      const hasHighImpact = opp.savings.ms > 500 || opp.savings.bytes > 50000;
      const isEasyFix = opp.frameworkAdvice?.effort === 'Easy';
      return hasHighImpact || isEasyFix;
    })
    .slice(0, 5); // Top 5 quick wins

  if (quickWins.length === 0) {
    return null;
  }

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getEstimatedTime = (effort) => {
    switch (effort) {
      case 'Easy':
        return '5-15 min';
      case 'Medium':
        return '30-60 min';
      case 'Hard':
        return '2-4 hours';
      default:
        return '15-30 min';
    }
  };

  return (
    <Card className="mt-6 border-primary/50 bg-gradient-to-br from-primary/5 to-amber-500/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-500" />
          Quick Wins
        </CardTitle>
        <CardDescription>
          High-impact optimizations that are easy to implement
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {quickWins.map((win, index) => (
          <div
            key={win.id}
            className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    #{index + 1}
                  </Badge>
                  {win.frameworkAdvice?.effort && (
                    <Badge variant={
                      win.frameworkAdvice.effort === 'Easy' ? 'good' :
                      win.frameworkAdvice.effort === 'Medium' ? 'warning' : 'poor'
                    }>
                      {win.frameworkAdvice.effort}
                    </Badge>
                  )}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {getEstimatedTime(win.frameworkAdvice?.effort)}
                  </div>
                </div>
                <h4 className="font-semibold text-base mb-1">{win.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {win.description}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-medium text-primary">
                  Potential Savings
                </div>
                {win.savings.ms > 0 && (
                  <div className="text-xs text-muted-foreground">
                    {Math.round(win.savings.ms / 1000)}s faster
                  </div>
                )}
                {win.savings.bytes > 0 && (
                  <div className="text-xs text-muted-foreground">
                    {Math.round(win.savings.bytes / 1024)}KB smaller
                  </div>
                )}
              </div>
            </div>

            {/* Framework-specific advice */}
            {win.frameworkAdvice && (
              <div className="mt-3 pt-3 border-t">
                <div className="flex items-start gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {win.frameworkAdvice.impact} Impact
                  </Badge>
                  <p className="text-sm font-medium flex-1">
                    {win.frameworkAdvice.tip}
                  </p>
                </div>

                {win.frameworkAdvice.code && (
                  <div className="relative mt-2">
                    <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                      <code>{win.frameworkAdvice.code}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 h-7 px-2"
                      onClick={() => copyCode(win.frameworkAdvice.code, win.id)}
                    >
                      {copiedId === win.id ? (
                        <>
                          <Check className="h-3 w-3 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground text-center">
            Implementing these {quickWins.length} quick wins could save up to{' '}
            <strong className="text-primary">
              {Math.round(
                quickWins.reduce((sum, win) => sum + win.savings.ms, 0) / 1000
              )}
              s
            </strong>{' '}
            in load time
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
