import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Plus, Trash2, TrendingUp, TrendingDown, Minus, Loader2, ChevronDown, ChevronUp, Smartphone, Monitor } from "lucide-react"

export default function CompetitorComparison({ mobileResults, desktopResults, onAnalyze }) {
  const [competitors, setCompetitors] = useState([]);
  const [newCompetitorUrl, setNewCompetitorUrl] = useState("");

  const addCompetitor = () => {
    if (newCompetitorUrl && competitors.length < 5) {
      setCompetitors([...competitors, {
        url: newCompetitorUrl,
        loadingMobile: false,
        loadingDesktop: false,
        mobileData: null,
        desktopData: null
      }]);
      setNewCompetitorUrl("");
    }
  };

  const removeCompetitor = (index) => {
    setCompetitors(competitors.filter((_, i) => i !== index));
  };

  const testCompetitor = async (index) => {
    // Set loading state for both mobile and desktop
    const updatedCompetitors = [...competitors];
    updatedCompetitors[index].loadingMobile = true;
    updatedCompetitors[index].loadingDesktop = true;
    setCompetitors(updatedCompetitors);

    try {
      const apiUrl = import.meta.env.DEV
        ? 'https://page-speed-analyzer.vercel.app/api/pagespeed'
        : '/api/pagespeed';

      // Test mobile first
      const mobileResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: competitors[index].url,
          strategy: 'mobile'
        }),
      });

      const mobileData = await mobileResponse.json();

      if (!mobileResponse.ok) {
        throw new Error(mobileData.error || 'Failed to analyze competitor');
      }

      // Update with mobile results
      const afterMobile = [...competitors];
      afterMobile[index].loadingMobile = false;
      afterMobile[index].mobileData = mobileData;
      afterMobile[index].tested = true;
      setCompetitors(afterMobile);

      // Test desktop
      const desktopResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: competitors[index].url,
          strategy: 'desktop'
        }),
      });

      const desktopData = await desktopResponse.json();

      if (!desktopResponse.ok) {
        throw new Error(desktopData.error || 'Failed to analyze competitor desktop');
      }

      // Update with desktop results
      const finalCompetitors = [...competitors];
      finalCompetitors[index].loadingDesktop = false;
      finalCompetitors[index].desktopData = desktopData;
      finalCompetitors[index].expanded = true; // Auto-expand after test
      setCompetitors(finalCompetitors);
    } catch (error) {
      // Reset loading state on error and store error
      const finalCompetitors = [...competitors];
      finalCompetitors[index].loadingMobile = false;
      finalCompetitors[index].loadingDesktop = false;
      finalCompetitors[index].error = error.message;
      setCompetitors(finalCompetitors);
    }
  };

  const toggleExpanded = (index) => {
    const updatedCompetitors = [...competitors];
    updatedCompetitors[index].expanded = !updatedCompetitors[index].expanded;
    setCompetitors(updatedCompetitors);
  };

  // Calculate trend based on average of mobile and desktop scores
  const calculateTrend = (comp) => {
    if (!comp.mobileData || !comp.desktopData) return null;

    const yourAvgScore = (mobileResults.performanceScore + desktopResults.performanceScore) / 2;
    const compAvgScore = (comp.mobileData.performanceScore + comp.desktopData.performanceScore) / 2;

    return {
      difference: compAvgScore - yourAvgScore,
      compScore: Math.round(compAvgScore),
      yourScore: Math.round(yourAvgScore)
    };
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Competitor Intelligence
        </CardTitle>
        <CardDescription>
          Compare your mobile & desktop performance against up to 5 competitors
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Add Competitor Form */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter competitor URL (e.g., https://competitor.com)"
            value={newCompetitorUrl}
            onChange={(e) => setNewCompetitorUrl(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md text-sm"
            disabled={competitors.length >= 5}
          />
          <Button
            onClick={addCompetitor}
            disabled={!newCompetitorUrl || competitors.length >= 5}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>

        {competitors.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
            <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No competitors added yet</p>
            <p className="text-xs mt-1">Add up to 5 competitor URLs to compare performance</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Current Site - Show both Mobile and Desktop */}
            <div className="p-4 border-2 border-primary rounded-lg bg-primary/5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="good">Your Site</Badge>
                  <span className="font-medium text-sm break-all">{mobileResults?.url}</span>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {/* Mobile Score */}
                <div className="bg-background/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">Mobile</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {mobileResults?.performanceScore}
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-xs mt-2 min-w-0">
                    <div>
                      <div className="text-muted-foreground">LCP</div>
                      <div className="font-semibold">{mobileResults?.metrics?.lcp?.displayValue}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">CLS</div>
                      <div className="font-semibold">{mobileResults?.metrics?.cls?.displayValue}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">TBT</div>
                      <div className="font-semibold">{mobileResults?.metrics?.tbt?.displayValue}</div>
                    </div>
                  </div>
                </div>
                {/* Desktop Score */}
                <div className="bg-background/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">Desktop</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {desktopResults?.performanceScore}
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-xs mt-2 min-w-0">
                    <div className="min-w-0">
                      <div className="text-muted-foreground truncate">LCP</div>
                      <div className="font-semibold truncate">{desktopResults?.metrics?.lcp?.displayValue}</div>
                    </div>
                    <div className="min-w-0">
                      <div className="text-muted-foreground truncate">CLS</div>
                      <div className="font-semibold truncate">{desktopResults?.metrics?.cls?.displayValue}</div>
                    </div>
                    <div className="min-w-0">
                      <div className="text-muted-foreground truncate">TBT</div>
                      <div className="font-semibold truncate">{desktopResults?.metrics?.tbt?.displayValue}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Competitors */}
            {competitors.map((comp, index) => {
              const trend = calculateTrend(comp);

              return (
                <div key={index} className="border rounded-lg bg-muted/30">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">Competitor {index + 1}</Badge>
                          <span className="text-sm font-medium">{comp.url}</span>
                        </div>
                        {!comp.tested && !comp.loadingMobile && !comp.loadingDesktop && (
                          <div className="text-xs text-muted-foreground">
                            Click "Test Competitor" to analyze both mobile & desktop
                          </div>
                        )}
                        {(comp.loadingMobile || comp.loadingDesktop) && (
                          <div className="text-xs text-primary mt-1">
                            {comp.loadingMobile && !comp.mobileData && 'Testing mobile...'}
                            {comp.mobileData && comp.loadingDesktop && 'Testing desktop...'}
                          </div>
                        )}
                        {comp.error && (
                          <div className="text-xs text-destructive mt-1">
                            Error: {comp.error}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => testCompetitor(index)}
                          disabled={comp.loadingMobile || comp.loadingDesktop}
                        >
                          {(comp.loadingMobile || comp.loadingDesktop) ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                              Testing...
                            </>
                          ) : comp.tested ? (
                            'Retest'
                          ) : (
                            'Test Competitor'
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeCompetitor(index)}
                          disabled={comp.loadingMobile || comp.loadingDesktop}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>

                    {/* Show results inline if tested */}
                    {comp.tested && comp.mobileData && comp.desktopData && trend && (
                      <div className="mt-3 pt-3 border-t">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="text-center">
                              <div className="text-2xl font-bold" style={{
                                color: trend.compScore >= 90 ? '#0CCE6B' :
                                       trend.compScore >= 50 ? '#FFA400' : '#FF4E42'
                              }}>
                                {trend.compScore}
                              </div>
                              <div className="text-xs text-muted-foreground">Avg Score</div>
                            </div>
                            <div className="flex items-center gap-1">
                              {trend.difference > 0 ? (
                                <TrendingUp className="h-4 w-4 text-good" />
                              ) : trend.difference < 0 ? (
                                <TrendingDown className="h-4 w-4 text-destructive" />
                              ) : (
                                <Minus className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className="text-xs text-muted-foreground">
                                {Math.abs(Math.round(trend.difference))} pts
                              </span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleExpanded(index)}
                          >
                            {comp.expanded ? (
                              <>
                                <ChevronUp className="h-4 w-4 mr-1" />
                                Less
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4 mr-1" />
                                Details
                              </>
                            )}
                          </Button>
                        </div>

                        {/* Quick preview - Mobile and Desktop scores */}
                        <div className="grid sm:grid-cols-2 gap-3 mb-2">
                          <div className="bg-background/50 p-2 rounded">
                            <div className="flex items-center gap-1 mb-1">
                              <Smartphone className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Mobile</span>
                            </div>
                            <div className="text-lg font-bold" style={{
                              color: comp.mobileData.performanceScore >= 90 ? '#0CCE6B' :
                                     comp.mobileData.performanceScore >= 50 ? '#FFA400' : '#FF4E42'
                            }}>
                              {comp.mobileData.performanceScore}
                            </div>
                          </div>
                          <div className="bg-background/50 p-2 rounded">
                            <div className="flex items-center gap-1 mb-1">
                              <Monitor className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Desktop</span>
                            </div>
                            <div className="text-lg font-bold" style={{
                              color: comp.desktopData.performanceScore >= 90 ? '#0CCE6B' :
                                     comp.desktopData.performanceScore >= 50 ? '#FFA400' : '#FF4E42'
                            }}>
                              {comp.desktopData.performanceScore}
                            </div>
                          </div>
                        </div>

                        {/* Expandable details */}
                        {comp.expanded && (
                          <div className="mt-3 space-y-3 text-sm">
                            {/* Mobile Metrics */}
                            <div>
                              <div className="flex items-center gap-1 mb-2">
                                <Smartphone className="h-3 w-3" />
                                <span className="text-xs font-semibold">Mobile Metrics</span>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="bg-background p-2 rounded">
                                  <div className="text-xs text-muted-foreground">LCP</div>
                                  <div className="font-semibold">{comp.mobileData.metrics?.lcp?.displayValue || 'N/A'}</div>
                                </div>
                                <div className="bg-background p-2 rounded">
                                  <div className="text-xs text-muted-foreground">CLS</div>
                                  <div className="font-semibold">{comp.mobileData.metrics?.cls?.displayValue || 'N/A'}</div>
                                </div>
                                <div className="bg-background p-2 rounded">
                                  <div className="text-xs text-muted-foreground">TBT</div>
                                  <div className="font-semibold">{comp.mobileData.metrics?.tbt?.displayValue || 'N/A'}</div>
                                </div>
                              </div>
                            </div>

                            {/* Desktop Metrics */}
                            <div>
                              <div className="flex items-center gap-1 mb-2">
                                <Monitor className="h-3 w-3" />
                                <span className="text-xs font-semibold">Desktop Metrics</span>
                              </div>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="bg-background p-2 rounded">
                                  <div className="text-xs text-muted-foreground">LCP</div>
                                  <div className="font-semibold">{comp.desktopData.metrics?.lcp?.displayValue || 'N/A'}</div>
                                </div>
                                <div className="bg-background p-2 rounded">
                                  <div className="text-xs text-muted-foreground">CLS</div>
                                  <div className="font-semibold">{comp.desktopData.metrics?.cls?.displayValue || 'N/A'}</div>
                                </div>
                                <div className="bg-background p-2 rounded">
                                  <div className="text-xs text-muted-foreground">TBT</div>
                                  <div className="font-semibold">{comp.desktopData.metrics?.tbt?.displayValue || 'N/A'}</div>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 text-xs">
                              <Badge variant="outline">
                                Accessibility: {Math.round((comp.mobileData.accessibilityScore + comp.desktopData.accessibilityScore) / 2)}
                              </Badge>
                              <Badge variant="outline">
                                Best Practices: {Math.round((comp.mobileData.bestPracticesScore + comp.desktopData.bestPracticesScore) / 2)}
                              </Badge>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {competitors.length > 0 && (() => {
          const testedCompetitors = competitors.filter(c => c.tested && c.mobileData && c.desktopData);

          if (testedCompetitors.length === 0) {
            return (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Competitive Analysis</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Once competitors are tested, you'll see:
                </p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-good" />
                    Performance gaps and advantages across mobile & desktop
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingDown className="h-3 w-3 text-poor" />
                    Areas where competitors are faster
                  </li>
                  <li className="flex items-center gap-2">
                    <Minus className="h-3 w-3 text-muted-foreground" />
                    Detailed metric-by-metric comparison
                  </li>
                </ul>
              </div>
            );
          }

          const yourAvgScore = (mobileResults.performanceScore + desktopResults.performanceScore) / 2;
          const betterThanYou = testedCompetitors.filter(c => {
            const compAvg = (c.mobileData.performanceScore + c.desktopData.performanceScore) / 2;
            return compAvg > yourAvgScore;
          });
          const worseThanYou = testedCompetitors.filter(c => {
            const compAvg = (c.mobileData.performanceScore + c.desktopData.performanceScore) / 2;
            return compAvg < yourAvgScore;
          });
          const sameAsYou = testedCompetitors.filter(c => {
            const compAvg = (c.mobileData.performanceScore + c.desktopData.performanceScore) / 2;
            return Math.round(compAvg) === Math.round(yourAvgScore);
          });

          return (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Competitive Analysis</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Comparison results based on {testedCompetitors.length} tested competitor{testedCompetitors.length > 1 ? 's' : ''} (average of mobile & desktop):
              </p>
              <ul className="text-sm space-y-1">
                {worseThanYou.length > 0 && (
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-good" />
                    You're faster than {worseThanYou.length} competitor{worseThanYou.length > 1 ? 's' : ''} by {Math.round(worseThanYou.reduce((sum, c) => {
                      const compAvg = (c.mobileData.performanceScore + c.desktopData.performanceScore) / 2;
                      return sum + (yourAvgScore - compAvg);
                    }, 0) / worseThanYou.length)} pts avg
                  </li>
                )}
                {betterThanYou.length > 0 && (
                  <li className="flex items-center gap-2">
                    <TrendingDown className="h-3 w-3 text-poor" />
                    {betterThanYou.length} competitor{betterThanYou.length > 1 ? 's are' : ' is'} faster than you by {Math.round(betterThanYou.reduce((sum, c) => {
                      const compAvg = (c.mobileData.performanceScore + c.desktopData.performanceScore) / 2;
                      return sum + (compAvg - yourAvgScore);
                    }, 0) / betterThanYou.length)} pts avg
                  </li>
                )}
                {sameAsYou.length > 0 && (
                  <li className="flex items-center gap-2">
                    <Minus className="h-3 w-3 text-muted-foreground" />
                    {sameAsYou.length} competitor{sameAsYou.length > 1 ? 's have' : ' has'} similar performance score
                  </li>
                )}
              </ul>
            </div>
          );
        })()}
      </CardContent>
    </Card>
  );
}
