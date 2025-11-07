import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Code2, Zap, Clock, TrendingUp } from "lucide-react"

export default function SmartRecommendations({ opportunities, detectedStack }) {
  if (!opportunities || opportunities.length === 0) {
    return null;
  }

  const getPriorityBadge = (savings) => {
    if (savings.ms > 500 || savings.bytes > 100000) {
      return { label: 'HIGH', variant: 'poor' };
    }
    if (savings.ms > 200 || savings.bytes > 50000) {
      return { label: 'MEDIUM', variant: 'warning' };
    }
    return { label: 'LOW', variant: 'good' };
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 10) / 10 + ' ' + sizes[i];
  };

  const formatTime = (ms) => {
    if (ms < 1000) return Math.round(ms) + ' ms';
    return (ms / 1000).toFixed(2) + ' s';
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Smart Recommendations
          {detectedStack?.framework && (
            <Badge variant="outline" className="ml-2">
              {detectedStack.framework}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Framework-specific optimizations with code examples
        </CardDescription>
      </CardHeader>
      <CardContent>
        {detectedStack?.framework && (
          <div className="mb-4 p-4 bg-primary/10 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              Detected Stack
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {detectedStack.framework && (
                <div>
                  <span className="text-muted-foreground">Framework:</span>{' '}
                  <span className="font-medium">{detectedStack.framework}</span>
                </div>
              )}
              {detectedStack.cms && (
                <div>
                  <span className="text-muted-foreground">CMS:</span>{' '}
                  <span className="font-medium">{detectedStack.cms}</span>
                </div>
              )}
              {detectedStack.bundler && (
                <div>
                  <span className="text-muted-foreground">Bundler:</span>{' '}
                  <span className="font-medium">{detectedStack.bundler}</span>
                </div>
              )}
              {detectedStack.libraries?.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Libraries:</span>{' '}
                  <span className="font-medium">{detectedStack.libraries.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <Accordion type="multiple" className="w-full">
          {opportunities.map((opp, index) => {
            const priority = getPriorityBadge(opp.savings);

            return (
              <AccordionItem key={opp.id} value={`item-${index}`}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-muted-foreground">
                        #{index + 1}
                      </span>
                      <div className="text-left">
                        <div className="font-semibold">{opp.title}</div>
                        {opp.frameworkAdvice && (
                          <Badge variant="secondary" className="mt-1">
                            {opp.frameworkAdvice.tip}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={priority.variant}>{priority.label}</Badge>
                      {opp.savings.ms > 0 && (
                        <span className="text-sm text-muted-foreground">
                          {formatTime(opp.savings.ms)}
                        </span>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {opp.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      {opp.savings.ms > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Time saved:</span>
                          <span className="font-semibold">{formatTime(opp.savings.ms)}</span>
                        </div>
                      )}
                      {opp.savings.bytes > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Size reduction:</span>
                          <span className="font-semibold">{formatBytes(opp.savings.bytes)}</span>
                        </div>
                      )}
                    </div>

                    {opp.frameworkAdvice && (
                      <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-semibold flex items-center gap-2">
                            <Code2 className="h-4 w-4" />
                            Framework-Specific Solution
                          </h5>
                          <div className="flex gap-2">
                            <Badge variant="outline">
                              {opp.frameworkAdvice.effort} effort
                            </Badge>
                            <Badge variant={
                              opp.frameworkAdvice.impact === 'Very High' || opp.frameworkAdvice.impact === 'High' 
                                ? 'good' 
                                : 'warning'
                            }>
                              {opp.frameworkAdvice.impact} impact
                            </Badge>
                          </div>
                        </div>

                        <p className="text-sm mb-3">{opp.frameworkAdvice.tip}</p>

                        {opp.frameworkAdvice.code && (
                          <div className="relative">
                            <pre className="bg-background p-4 rounded border text-xs overflow-x-auto">
                              <code>{opp.frameworkAdvice.code}</code>
                            </pre>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute top-2 right-2"
                              onClick={() => copyCode(opp.frameworkAdvice.code)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
