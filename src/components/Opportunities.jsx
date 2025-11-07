import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, HardDrive, TrendingUp } from 'lucide-react';

export default function Opportunities({ opportunities }) {
  if (!opportunities || opportunities.length === 0) {
    return null;
  }

  const getPriorityVariant = (savings) => {
    if (savings.ms > 500 || savings.bytes > 100000) {
      return 'poor';
    }
    if (savings.ms > 200 || savings.bytes > 50000) {
      return 'warning';
    }
    return 'good';
  };

  const getPriorityLabel = (savings) => {
    if (savings.ms > 500 || savings.bytes > 100000) {
      return 'High Priority';
    }
    if (savings.ms > 200 || savings.bytes > 50000) {
      return 'Medium Priority';
    }
    return 'Low Priority';
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

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <CardTitle>Optimization Opportunities</CardTitle>
        </div>
        <CardDescription>
          Top recommendations to improve your page performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {opportunities.map((opportunity, index) => {
            const priorityVariant = getPriorityVariant(opportunity.savings);
            const priorityLabel = getPriorityLabel(opportunity.savings);

            return (
              <Card key={opportunity.id} className="border-2 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <CardTitle className="text-base leading-tight">
                          {opportunity.title}
                        </CardTitle>
                        <Badge variant={priorityVariant} className="flex-shrink-0">
                          {priorityLabel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div
                    className="text-sm text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: opportunity.description }}
                  />

                  <div className="flex flex-wrap gap-3 pt-2">
                    {opportunity.savings.ms > 0 && (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10">
                        <Clock className="h-4 w-4 text-primary" />
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">Potential savings</span>
                          <span className="text-sm font-semibold text-primary">
                            {formatTime(opportunity.savings.ms)}
                          </span>
                        </div>
                      </div>
                    )}
                    {opportunity.savings.bytes > 0 && (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10">
                        <HardDrive className="h-4 w-4 text-primary" />
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">Size reduction</span>
                          <span className="text-sm font-semibold text-primary">
                            {formatBytes(opportunity.savings.bytes)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
