import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, ZoomIn, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Screenshot({ screenshot }) {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!screenshot) return null;

  return (
    <>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Page Screenshot
          </CardTitle>
          <CardDescription>
            Visual representation of your page as analyzed by Lighthouse
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative group cursor-pointer" onClick={() => setIsZoomed(true)}>
            <img
              src={screenshot}
              alt="Page screenshot"
              className="w-full rounded-lg shadow-lg border border-border transition-transform hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <div className="text-white flex items-center gap-2">
                <ZoomIn className="h-6 w-6" />
                <span className="font-medium">Click to view full size</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lightbox Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setIsZoomed(false)}
          >
            <X className="h-6 w-6" />
          </Button>
          <img
            src={screenshot}
            alt="Page screenshot - full size"
            className="max-w-full max-h-full rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
