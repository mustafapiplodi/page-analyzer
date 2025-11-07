import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Eye, Zap, AlertCircle, CheckCircle2, Shield, Search } from "lucide-react"

export default function AccessibilityScore({
  accessibilityScore,
  performanceScore,
  bestPracticesScore,
  seoScore,
  accessibilityIssues
}) {
  const getScoreColor = (score) => {
    if (score >= 90) return 'good';
    if (score >= 50) return 'warning';
    return 'poor';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 50) return 'Needs Work';
    return 'Critical';
  };

  const getCombinedScore = () => {
    return Math.round((performanceScore * 0.4) + (accessibilityScore * 0.25) + (bestPracticesScore * 0.15) + (seoScore * 0.2));
  };

  const combinedScore = getCombinedScore();

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Performance + Accessibility Score
        </CardTitle>
        <CardDescription>
          Combined view of performance, accessibility, and best practices
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Combined Score */}
        <div className="mb-6 p-6 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg border">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2">Combined Score</div>
            <div className="text-5xl font-bold mb-2" style={{
              color: combinedScore >= 90 ? '#0CCE6B' : combinedScore >= 50 ? '#FFA400' : '#FF4E42'
            }}>
              {combinedScore}
            </div>
            <Badge variant={getScoreColor(combinedScore)}>
              {getScoreLabel(combinedScore)}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">
              40% Performance • 25% Accessibility • 15% Best Practices • 20% SEO
            </p>
          </div>
        </div>

        <Tabs defaultValue="scores" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="scores">Score Breakdown</TabsTrigger>
            <TabsTrigger value="issues">
              Accessibility Issues
              {accessibilityIssues?.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {accessibilityIssues.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scores" className="space-y-4 mt-4">
            {/* Performance Score */}
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5" style={{
                  color: performanceScore >= 90 ? '#0CCE6B' : performanceScore >= 50 ? '#FFA400' : '#FF4E42'
                }} />
                <div>
                  <div className="font-semibold">Performance</div>
                  <div className="text-xs text-muted-foreground">Page load speed & metrics</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-2xl font-bold">{performanceScore}</div>
                  <Badge variant={getScoreColor(performanceScore)} className="text-xs">
                    {getScoreLabel(performanceScore)}
                  </Badge>
                </div>
                <div className="w-24 bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${performanceScore}%`,
                      backgroundColor: performanceScore >= 90 ? '#0CCE6B' : performanceScore >= 50 ? '#FFA400' : '#FF4E42'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Accessibility Score */}
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5" style={{
                  color: accessibilityScore >= 90 ? '#0CCE6B' : accessibilityScore >= 50 ? '#FFA400' : '#FF4E42'
                }} />
                <div>
                  <div className="font-semibold">Accessibility</div>
                  <div className="text-xs text-muted-foreground">Screen readers & WCAG compliance</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-2xl font-bold">{accessibilityScore}</div>
                  <Badge variant={getScoreColor(accessibilityScore)} className="text-xs">
                    {getScoreLabel(accessibilityScore)}
                  </Badge>
                </div>
                <div className="w-24 bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${accessibilityScore}%`,
                      backgroundColor: accessibilityScore >= 90 ? '#0CCE6B' : accessibilityScore >= 50 ? '#FFA400' : '#FF4E42'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Best Practices Score */}
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5" style={{
                  color: bestPracticesScore >= 90 ? '#0CCE6B' : bestPracticesScore >= 50 ? '#FFA400' : '#FF4E42'
                }} />
                <div>
                  <div className="font-semibold">Best Practices</div>
                  <div className="text-xs text-muted-foreground">Security & modern standards</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-2xl font-bold">{bestPracticesScore}</div>
                  <Badge variant={getScoreColor(bestPracticesScore)} className="text-xs">
                    {getScoreLabel(bestPracticesScore)}
                  </Badge>
                </div>
                <div className="w-24 bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${bestPracticesScore}%`,
                      backgroundColor: bestPracticesScore >= 90 ? '#0CCE6B' : bestPracticesScore >= 50 ? '#FFA400' : '#FF4E42'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* SEO Score */}
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5" style={{
                  color: seoScore >= 90 ? '#0CCE6B' : seoScore >= 50 ? '#FFA400' : '#FF4E42'
                }} />
                <div>
                  <div className="font-semibold">SEO</div>
                  <div className="text-xs text-muted-foreground">Search engine optimization</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-2xl font-bold">{seoScore}</div>
                  <Badge variant={getScoreColor(seoScore)} className="text-xs">
                    {getScoreLabel(seoScore)}
                  </Badge>
                </div>
                <div className="w-24 bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${seoScore}%`,
                      backgroundColor: seoScore >= 90 ? '#0CCE6B' : seoScore >= 50 ? '#FFA400' : '#FF4E42'
                    }}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="issues" className="mt-4">
            {accessibilityIssues && accessibilityIssues.length > 0 ? (
              <Accordion type="multiple" className="w-full">
                {accessibilityIssues.map((issue, index) => (
                  <AccordionItem key={issue.id} value={`issue-${index}`}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-3 w-full pr-4">
                        <AlertCircle className={`h-4 w-4 ${
                          issue.impact === 'high' ? 'text-poor' :
                          issue.impact === 'medium' ? 'text-warning' :
                          'text-muted-foreground'
                        }`} />
                        <div className="flex-1 text-left">
                          <div className="font-medium">{issue.title}</div>
                          {issue.itemCount > 0 && (
                            <div className="text-xs text-muted-foreground">
                              {issue.itemCount} {issue.itemCount === 1 ? 'item' : 'items'} affected
                            </div>
                          )}
                        </div>
                        <Badge variant={
                          issue.impact === 'high' ? 'poor' :
                          issue.impact === 'medium' ? 'warning' :
                          'secondary'
                        }>
                          {issue.impact}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {issue.description}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle2 className="h-12 w-12 mx-auto mb-2 text-good" />
                <p>No accessibility issues detected!</p>
                <p className="text-xs mt-1">Your site follows accessibility best practices</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
