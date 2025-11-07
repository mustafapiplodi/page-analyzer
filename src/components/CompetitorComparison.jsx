import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Plus, Trash2, TrendingUp, TrendingDown, Minus, Loader2, ChevronDown, ChevronUp } from "lucide-react"

export default function CompetitorComparison({ currentSite, onAnalyze }) {
  const [competitors, setCompetitors] = useState([]);
  const [newCompetitorUrl, setNewCompetitorUrl] = useState("");

  const addCompetitor = () => {
    if (newCompetitorUrl && competitors.length < 5) {
      setCompetitors([...competitors, {
        url: newCompetitorUrl,
        loading: false,
        data: null
      }]);
      setNewCompetitorUrl("");
    }
  };

  const removeCompetitor = (index) => {
    setCompetitors(competitors.filter((_, i) => i !== index));
  };

  const testCompetitor = async (index) => {
    // Set loading state for this competitor
    const updatedCompetitors = [...competitors];
    updatedCompetitors[index].loading = true;
    setCompetitors(updatedCompetitors);

    try {
      // Fetch data directly without updating main page
      const apiUrl = import.meta.env.DEV
        ? 'https://page-speed-analyzer-fwrormzjc-mustafapiplodis-projects.vercel.app/api/pagespeed'
        : '/api/pagespeed';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: competitors[index].url,
          strategy: currentSite.strategy || 'mobile'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze competitor');
      }

      // Store the results in the competitor object
      const finalCompetitors = [...competitors];
      finalCompetitors[index].loading = false;
      finalCompetitors[index].tested = true;
      finalCompetitors[index].data = data;
      finalCompetitors[index].expanded = true; // Auto-expand after test
      setCompetitors(finalCompetitors);
    } catch (error) {
      // Reset loading state on error and store error
      const finalCompetitors = [...competitors];
      finalCompetitors[index].loading = false;
      finalCompetitors[index].error = error.message;
      setCompetitors(finalCompetitors);
    }
  };

  const toggleExpanded = (index) => {
    const updatedCompetitors = [...competitors];
    updatedCompetitors[index].expanded = !updatedCompetitors[index].expanded;
    setCompetitors(updatedCompetitors);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Competitor Intelligence
        </CardTitle>
        <CardDescription>
          Compare your performance against up to 5 competitors
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
            {/* Current Site */}
            <div className="p-4 border-2 border-primary rounded-lg bg-primary/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="good">Your Site</Badge>
                  <span className="font-medium">{currentSite?.url}</span>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {currentSite?.performanceScore}
                  </div>
                  <div className="text-xs text-muted-foreground">Performance Score</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <div className="text-muted-foreground">LCP</div>
                  <div className="font-semibold">{currentSite?.metrics?.lcp?.displayValue}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">CLS</div>
                  <div className="font-semibold">{currentSite?.metrics?.cls?.displayValue}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">TBT</div>
                  <div className="font-semibold">{currentSite?.metrics?.tbt?.displayValue}</div>
                </div>
              </div>
            </div>

            {/* Competitors */}
            {competitors.map((comp, index) => (
              <div key={index} className="border rounded-lg bg-muted/30">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">Competitor {index + 1}</Badge>
                        <span className="text-sm font-medium">{comp.url}</span>
                      </div>
                      {!comp.tested && !comp.loading && (
                        <div className="text-xs text-muted-foreground">
                          Click "Test Competitor" to analyze
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
                        disabled={comp.loading}
                      >
                        {comp.loading ? (
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
                        disabled={comp.loading}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>

                  {/* Show results inline if tested */}
                  {comp.tested && comp.data && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <div className="text-2xl font-bold" style={{
                              color: comp.data.performanceScore >= 90 ? '#0CCE6B' :
                                     comp.data.performanceScore >= 50 ? '#FFA400' : '#FF4E42'
                            }}>
                              {comp.data.performanceScore}
                            </div>
                            <div className="text-xs text-muted-foreground">Performance</div>
                          </div>
                          {currentSite.performanceScore && (
                            <div className="flex items-center gap-1">
                              {comp.data.performanceScore > currentSite.performanceScore ? (
                                <TrendingUp className="h-4 w-4 text-good" />
                              ) : comp.data.performanceScore < currentSite.performanceScore ? (
                                <TrendingDown className="h-4 w-4 text-destructive" />
                              ) : (
                                <Minus className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className="text-xs text-muted-foreground">
                                {Math.abs(comp.data.performanceScore - currentSite.performanceScore)} pts
                              </span>
                            </div>
                          )}
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

                      {/* Expandable details */}
                      {comp.expanded && (
                        <div className="mt-3 space-y-2 text-sm">
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-background p-2 rounded">
                              <div className="text-xs text-muted-foreground">LCP</div>
                              <div className="font-semibold">{comp.data.metrics?.lcp?.displayValue || 'N/A'}</div>
                            </div>
                            <div className="bg-background p-2 rounded">
                              <div className="text-xs text-muted-foreground">CLS</div>
                              <div className="font-semibold">{comp.data.metrics?.cls?.displayValue || 'N/A'}</div>
                            </div>
                            <div className="bg-background p-2 rounded">
                              <div className="text-xs text-muted-foreground">TBT</div>
                              <div className="font-semibold">{comp.data.metrics?.tbt?.displayValue || 'N/A'}</div>
                            </div>
                          </div>
                          <div className="flex gap-2 text-xs">
                            <Badge variant="outline">
                              Accessibility: {comp.data.accessibilityScore}
                            </Badge>
                            <Badge variant="outline">
                              Best Practices: {comp.data.bestPracticesScore}
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {competitors.length > 0 && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Competitive Analysis</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Once competitors are tested, you'll see:
            </p>
            <ul className="text-sm space-y-1">
              <li className="flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-good" />
                Performance gaps and advantages
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
        )}
      </CardContent>
    </Card>
  );
}
