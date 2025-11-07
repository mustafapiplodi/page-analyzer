import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, ZoomIn, X, Smartphone, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Screenshot({ screenshot, strategy = 'mobile' }) {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!screenshot) return null;

  const isMobile = strategy === 'mobile';

  return (
    <>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Page Preview
          </CardTitle>
          <CardDescription>
            {isMobile ? 'Mobile' : 'Desktop'} screenshot from Lighthouse analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div
              className="relative group cursor-pointer"
              onClick={() => setIsZoomed(true)}
            >
              {/* Device Mockup Frame */}
              <div className={`relative ${isMobile ? 'w-[280px]' : 'w-full max-w-2xl'}`}>
                {isMobile ? (
                  // Mobile Frame
                  <div className="relative bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10"></div>
                    {/* Screen */}
                    <div className="relative bg-white rounded-[2rem] overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
                      <img
                        src={screenshot}
                        alt="Mobile page screenshot"
                        className="w-full h-full object-cover object-top"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="text-white flex flex-col items-center gap-2">
                          <ZoomIn className="h-8 w-8" />
                          <span className="text-sm font-medium">Click to enlarge</span>
                        </div>
                      </div>
                    </div>
                    {/* Home Indicator */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-600 rounded-full"></div>
                  </div>
                ) : (
                  // Desktop Frame
                  <div className="relative bg-gray-900 rounded-t-xl shadow-2xl">
                    {/* Browser Top Bar */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 rounded-t-xl">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex-1 mx-4 h-6 bg-gray-700 rounded flex items-center px-3">
                        <div className="w-3 h-3 rounded-full bg-gray-600 mr-2"></div>
                        <div className="h-2 flex-1 bg-gray-600 rounded"></div>
                      </div>
                    </div>
                    {/* Screen */}
                    <div className="relative bg-white overflow-hidden" style={{ aspectRatio: '16/10' }}>
                      <img
                        src={screenshot}
                        alt="Desktop page screenshot"
                        className="w-full h-full object-cover object-top"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="text-white flex flex-col items-center gap-2">
                          <ZoomIn className="h-8 w-8" />
                          <span className="text-sm font-medium">Click to enlarge</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
          <div className="max-w-5xl w-full">
            <img
              src={screenshot}
              alt="Page screenshot - full size"
              className="w-full rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
