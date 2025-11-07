import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Plus, Trash2, TrendingUp, TrendingDown, Minus } from "lucide-react"

export default function CompetitorComparison({ currentSite }) {
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
                <div className="text-2xl font-bold">
                  {currentSite?.performanceScore}
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
              <div key={index} className="p-4 border rounded-lg bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Competitor {index + 1}</Badge>
                      <span className="text-sm text-muted-foreground">{comp.url}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Click "Test Competitor" to analyze this URL
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      Test Competitor
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeCompetitor(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
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
