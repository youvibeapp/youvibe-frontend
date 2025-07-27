import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { CelebrityMatchSectionProps } from './types';

export default function CelebrityMatchSection({
  celebrityMatch,
  userImageUrl,
}: CelebrityMatchSectionProps) {
  // Don't render if no celebrity match data
  if (!celebrityMatch || !celebrityMatch.matches.length) {
    return null;
  }

  const hasMultipleMatches = celebrityMatch.matches.length > 1;

  return (
    <div className="space-y-3">
      {/* Aesthetic Soulmate Section */}
      <div className="text-left">
        <h4 className="text-base font-medium text-gray-800 flex items-center justify-between">
          <span className="flex items-center gap-1">
            Aesthetic Soulmate
            <span className="text-red-500">♥</span>
          </span>
          {hasMultipleMatches && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <svg
                className="w-3 h-3 rotate-90"
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
              {celebrityMatch.matches.length} matches
            </span>
          )}
        </h4>
      </div>

      {/* Vertical Carousel for Celebrity Matches */}
      <Carousel
        orientation="vertical"
        className="w-full"
        opts={{
          align: 'start',
          loop: true,
          skipSnaps: false,
          dragFree: false,
        }}
      >
        <CarouselContent className="h-[160px] -mt-1">
          {celebrityMatch.matches.map((match, index) => {
            const celebrityImage = match.images[0]?.fullUrl;

            return (
              <CarouselItem key={index} className="pt-1 basis-full">
                <div className="space-y-2 h-full flex flex-col justify-start">
                  {/* Celebrity Twin Header */}
                  <div className="text-left">
                    <p className="text-sm text-gray-600">
                      Celeb Twin:{' '}
                      <span className="font-medium">✨ {match.name} ✨</span>
                    </p>
                  </div>

                  {/* Side-by-side Images */}
                  <div className="flex gap-3 justify-center items-center">
                    {/* User Image */}
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200 shadow-md">
                        {userImageUrl ? (
                          <img
                            src={userImageUrl}
                            alt="Your photo"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs">
                            You
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Celebrity Image */}
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200 shadow-md">
                        {celebrityImage ? (
                          <img
                            src={celebrityImage}
                            alt={match.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs text-center">
                            {match.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Match Details */}
                  <div className="text-center space-y-0.5">
                    <p className="text-xs text-gray-500">
                      {Math.round(match.confidenceScore * 100)}% match •{' '}
                      {match.profession}
                    </p>
                    {match.matchReasons.length > 0 && (
                      <p className="text-xs text-gray-600">
                        Similar: {match.matchReasons.slice(0, 2).join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Vertical Navigation - only show if multiple matches */}
        {hasMultipleMatches && (
          <>
            <CarouselPrevious className="top-4 right-2 rotate-90 h-6 w-6" />
            <CarouselNext className="bottom-4 right-2 rotate-90 h-6 w-6" />
          </>
        )}
      </Carousel>
    </div>
  );
}
