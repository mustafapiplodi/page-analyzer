import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileCode, FileImage, FileType, Package, File, BarChart3 } from "lucide-react";

export default function ResourceBreakdown({ breakdown }) {
  if (!breakdown || breakdown.total === 0) {
    return null;
  }

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 10) / 10 + ' ' + sizes[i];
  };

  const categoryInfo = {
    javascript: {
      name: 'JavaScript',
      icon: FileCode,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20'
    },
    css: {
      name: 'CSS',
      icon: FileType,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    images: {
      name: 'Images',
      icon: FileImage,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    fonts: {
      name: 'Fonts',
      icon: FileType,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    document: {
      name: 'Document',
      icon: File,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    },
    other: {
      name: 'Other',
      icon: Package,
      color: 'text-gray-500',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/20'
    }
  };

  // Sort categories by size (descending)
  const sortedCategories = Object.entries(breakdown)
    .filter(([key]) => key !== 'total')
    .filter(([, data]) => data.size > 0)
    .sort(([, a], [, b]) => b.size - a.size);

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Resource Breakdown
        </CardTitle>
        <CardDescription>
          Analysis of resource types and their impact on page size
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Total Size Summary */}
        <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Total Page Size</div>
              <div className="text-3xl font-bold text-primary">
                {formatBytes(breakdown.total)}
              </div>
            </div>
            <Package className="h-12 w-12 text-primary/30" />
          </div>
        </div>

        {/* Resource Categories */}
        <div className="space-y-4">
          {sortedCategories.map(([category, data]) => {
            const info = categoryInfo[category];
            const Icon = info.icon;

            return (
              <div
                key={category}
                className={`p-4 rounded-lg border ${info.borderColor} ${info.bgColor}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${info.bgColor}`}>
                      <Icon className={`h-5 w-5 ${info.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold">{info.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{data.count} {data.count === 1 ? 'file' : 'files'}</span>
                        <span>•</span>
                        <span>{formatBytes(data.size)}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-lg font-bold">
                    {data.percentage}%
                  </Badge>
                </div>

                {/* Progress Bar */}
                <Progress
                  value={data.percentage}
                  className="h-2 mb-2"
                  indicatorClassName={info.color.replace('text-', 'bg-')}
                />

                {/* Optimization Tips */}
                <div className="mt-3 text-xs text-muted-foreground">
                  {category === 'javascript' && data.percentage > 30 && (
                    <p>💡 Consider code splitting and lazy loading to reduce JS bundle size</p>
                  )}
                  {category === 'images' && data.percentage > 40 && (
                    <p>💡 Use modern formats (WebP/AVIF) and lazy loading for images</p>
                  )}
                  {category === 'css' && data.percentage > 15 && (
                    <p>💡 Remove unused CSS and consider critical CSS inline</p>
                  )}
                  {category === 'fonts' && data.percentage > 10 && (
                    <p>💡 Use font-display: swap and subset fonts to reduce font loading time</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Optimization Summary */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold mb-2 text-sm">Quick Tips</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Keep total page size under 1.5MB for optimal mobile performance</li>
            <li>• JavaScript should ideally be less than 25% of total page weight</li>
            <li>• Compress images and use responsive image techniques</li>
            <li>• Enable text compression (Gzip/Brotli) on your server</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
