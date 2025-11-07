import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";

export default function SEOAnalysis({ seoScore, seoIssues = [] }) {
  const getScoreColor = (score) => {
    if (score >= 90) return '#0CCE6B';
    if (score >= 50) return '#FFA400';
    return '#FF4E42';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 50) return 'Needs Work';
    return 'Critical';
  };

  const getScoreVariant = (score) => {
    if (score >= 90) return 'good';
    if (score >= 50) return 'warning';
    return 'poor';
  };

  // Group issues by impact
  const highImpact = seoIssues.filter(issue => issue.impact === 'high');
  const mediumImpact = seoIssues.filter(issue => issue.impact === 'medium');
  const lowImpact = seoIssues.filter(issue => issue.impact === 'low');

  return (
    <Card className="mt-6 border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          SEO Analysis
        </CardTitle>
        <CardDescription>
          Search engine optimization score and recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* SEO Score */}
        <div className="mb-6 p-6 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground mb-2">SEO Score</div>
              <div className="flex items-center gap-3">
                <div
                  className="text-5xl font-bold"
                  style={{ color: getScoreColor(seoScore) }}
                >
                  {seoScore}
                </div>
                <Badge variant={getScoreVariant(seoScore)} className="text-sm">
                  {getScoreLabel(seoScore)}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Based on {seoIssues.length === 0 ? 'all' : `${13 - seoIssues.length} passing`} SEO best practices
              </p>
            </div>
            <TrendingUp className="h-16 w-16 text-primary/30" />
          </div>
        </div>

        {/* SEO Issues */}
        {seoIssues.length > 0 ? (
          <div className="space-y-4">
            {/* High Impact Issues */}
            {highImpact.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-poor" />
                  High Priority Issues ({highImpact.length})
                </h4>
                <Accordion type="multiple" className="w-full">
                  {highImpact.map((issue, index) => (
                    <AccordionItem key={issue.id} value={`high-${index}`}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-3 w-full pr-4">
                          <div className="flex-1 text-left">
                            <div className="font-medium">{issue.title}</div>
                            {issue.itemCount > 0 && (
                              <div className="text-xs text-muted-foreground">
                                {issue.itemCount} {issue.itemCount === 1 ? 'item' : 'items'} affected
                              </div>
                            )}
                          </div>
                          <Badge variant="poor">High</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pt-2">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {issue.description}
                          </p>
                          {getSEORecommendation(issue.id) && (
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <p className="text-sm font-medium mb-1">💡 How to fix:</p>
                              <p className="text-sm text-muted-foreground">
                                {getSEORecommendation(issue.id)}
                              </p>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* Medium Impact Issues */}
            {mediumImpact.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-warning" />
                  Medium Priority Issues ({mediumImpact.length})
                </h4>
                <Accordion type="multiple" className="w-full">
                  {mediumImpact.map((issue, index) => (
                    <AccordionItem key={issue.id} value={`medium-${index}`}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-3 w-full pr-4">
                          <div className="flex-1 text-left">
                            <div className="font-medium">{issue.title}</div>
                            {issue.itemCount > 0 && (
                              <div className="text-xs text-muted-foreground">
                                {issue.itemCount} {issue.itemCount === 1 ? 'item' : 'items'} affected
                              </div>
                            )}
                          </div>
                          <Badge variant="warning">Medium</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pt-2">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {issue.description}
                          </p>
                          {getSEORecommendation(issue.id) && (
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <p className="text-sm font-medium mb-1">💡 How to fix:</p>
                              <p className="text-sm text-muted-foreground">
                                {getSEORecommendation(issue.id)}
                              </p>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* Low Impact Issues */}
            {lowImpact.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  Low Priority Issues ({lowImpact.length})
                </h4>
                <Accordion type="multiple" className="w-full">
                  {lowImpact.map((issue, index) => (
                    <AccordionItem key={issue.id} value={`low-${index}`}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-3 w-full pr-4">
                          <div className="flex-1 text-left">
                            <div className="font-medium">{issue.title}</div>
                            {issue.itemCount > 0 && (
                              <div className="text-xs text-muted-foreground">
                                {issue.itemCount} {issue.itemCount === 1 ? 'item' : 'items'} affected
                              </div>
                            )}
                          </div>
                          <Badge variant="secondary">Low</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                          {issue.description}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-2 text-good" />
            <p className="font-medium">Excellent SEO!</p>
            <p className="text-xs mt-1">Your site follows all SEO best practices</p>
          </div>
        )}

        {/* SEO Tips */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold mb-2 text-sm">SEO Best Practices</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Ensure all pages have unique, descriptive titles (50-60 chars)</li>
            <li>• Write compelling meta descriptions (120-155 chars)</li>
            <li>• Use descriptive alt text for all images</li>
            <li>• Implement structured data (Schema.org) for rich snippets</li>
            <li>• Ensure your site is mobile-friendly and has good Core Web Vitals</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to provide specific recommendations
function getSEORecommendation(issueId) {
  const recommendations = {
    'document-title': 'Add a unique, descriptive title tag to your page. Keep it under 60 characters and include your primary keyword.',
    'meta-description': 'Add a meta description tag with a compelling summary of your page content. Aim for 120-155 characters.',
    'link-text': 'Use descriptive anchor text for links instead of generic phrases like "click here" or "read more".',
    'image-alt': 'Add descriptive alt text to all images. This helps with accessibility and SEO.',
    'crawlable-anchors': 'Ensure all links use standard <a> tags with href attributes for proper crawling.',
    'is-crawlable': 'Remove any blocking directives in robots.txt or meta robots tags that prevent crawling.',
    'robots-txt': 'Create or fix your robots.txt file to properly guide search engine crawlers.',
    'hreflang': 'Implement hreflang tags if you have multiple language versions of your content.',
    'canonical': 'Add canonical tags to prevent duplicate content issues.',
    'viewport': 'Add a viewport meta tag for proper mobile rendering.',
    'font-size': 'Ensure text is legible with font sizes of at least 12px.',
    'tap-targets': 'Make touch targets at least 48x48px for better mobile usability.',
    'structured-data': 'Implement Schema.org structured data for enhanced search results.'
  };

  return recommendations[issueId] || null;
}
