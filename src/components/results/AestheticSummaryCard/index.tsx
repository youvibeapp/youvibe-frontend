'use client';

import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import CelebrityMatchSection from '../CelebrityMatchSection';
import { AestheticSummaryCardProps } from './types';
import { useEffect, useState } from 'react';

export default function AestheticSummaryCard({
  analysis,
  celebrityMatch,
  userImageUrl,
}: AestheticSummaryCardProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Get the description text
  const getDescriptionText = () => {
    if (celebrityMatch?.matches?.[0]?.name) {
      return `You're radiating ${celebrityMatch.matches[0].name} energy - confident, chill and a little dreamy.`;
    }
    return (
      analysis.styleDescription || `${analysis.style} ${analysis.mood}`.trim()
    );
  };

  const descriptionText = getDescriptionText();
  const hasMultipleSlides = !!celebrityMatch;

  return (
    <Card className="p-4 rounded-3xl shadow-sm border-none relative">
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {/* First Slide - Aesthetic DNA + Color Palette */}
          <CarouselItem>
            <div className="space-y-4">
              <div className="text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Your Aesthetic DNA
                  </h3>
                  {hasMultipleSlides && (
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      swipe
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  <p className="leading-relaxed break-words">
                    {celebrityMatch?.matches?.[0]?.name ? (
                      <>
                        You&apos;re radiating{' '}
                        <span className="font-medium">
                          {celebrityMatch.matches[0].name}
                        </span>{' '}
                        energy - confident, chill and a little dreamy.
                      </>
                    ) : (
                      <>Your vibe is: {descriptionText}</>
                    )}
                  </p>
                </div>

                {/* Color Palette Section */}
                {analysis.colorPalette.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-800">
                      Your Color Palette
                    </h4>

                    {/* Main color display */}
                    <div className="grid grid-cols-2 gap-2">
                      {analysis.colorPalette.slice(0, 4).map((color, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <div
                            className="w-6 h-6 rounded-full border-2 border-white shadow-md flex-shrink-0"
                            style={{ backgroundColor: color }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-gray-700 uppercase truncate">
                              {color}
                            </div>
                            <div className="text-xs text-gray-500">
                              {index === 0
                                ? 'Primary'
                                : index === 1
                                  ? 'Secondary'
                                  : `Accent ${index - 1}`}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Color bar visualization */}
                    <div className="mt-3">
                      <div className="flex rounded-lg overflow-hidden h-4 shadow-sm">
                        {analysis.colorPalette.map((color, index) => (
                          <div
                            key={index}
                            className="flex-1"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CarouselItem>

          {/* Second Slide - Celebrity Match (only if available) */}
          {celebrityMatch && (
            <CarouselItem>
              <div className="space-y-4">
                <CelebrityMatchSection
                  celebrityMatch={celebrityMatch}
                  userImageUrl={userImageUrl}
                />
              </div>
            </CarouselItem>
          )}
        </CarouselContent>

        {/* Navigation arrows - only show if we have multiple slides */}
        {hasMultipleSlides && (
          <>
            <CarouselPrevious className="left-2 h-8 w-8" />
            <CarouselNext className="right-2 h-8 w-8" />
          </>
        )}
      </Carousel>

      {/* Carousel indicators - only show if we have multiple slides */}
      {hasMultipleSlides && count > 1 && (
        <div className="flex justify-center mt-3 space-x-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === current
                  ? 'bg-gray-800 scale-110'
                  : 'bg-gray-300 hover:bg-gray-400 hover:scale-105'
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
