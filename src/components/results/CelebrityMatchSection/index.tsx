import React from 'react';
import type { CelebrityMatchSectionProps } from './types';

export default function CelebrityMatchSection({
  celebrityMatch,
  userImageUrl,
}: CelebrityMatchSectionProps) {
  // Don't render if no celebrity match data
  if (!celebrityMatch || !celebrityMatch.matches.length) {
    return null;
  }

  // Get the first (best) match
  const topMatch = celebrityMatch.matches[0];
  const celebrityImage = topMatch.images[0]?.fullUrl;

  return (
    <div className="space-y-4">
      {/* Aesthetic Soulmate Section */}
      <div className="text-left mb-4">
        <h4 className="text-base font-medium text-gray-800 flex items-center justify-left gap-1">
          Aesthetic Soulmate
          <span className="text-red-500">♥</span>
        </h4>
      </div>

      {/* Celebrity Twin Header */}
      <div className="text-left mb-4">
        <p className="text-sm text-gray-600">
          Celeb Twin: <span className="font-medium">✨ {topMatch.name} ✨</span>
        </p>
      </div>

      {/* Side-by-side Images */}
      <div className="flex gap-6 justify-center items-center">
        {/* User Image */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-200 shadow-md">
            {userImageUrl ? (
              <img
                src={userImageUrl}
                alt="Your photo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs">
                Your Photo
              </div>
            )}
          </div>
        </div>

        {/* Celebrity Image */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-200 shadow-md">
            {celebrityImage ? (
              <img
                src={celebrityImage}
                alt={topMatch.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs text-center">
                {topMatch.name}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Match Details */}
      <div className="text-center space-y-2">
        <p className="text-xs text-gray-500">
          {Math.round(topMatch.confidenceScore * 100)}% match
        </p>
        {topMatch.matchReasons.length > 0 && (
          <p className="text-xs text-gray-600">
            Similar: {topMatch.matchReasons.slice(0, 2).join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}
