import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { DetailedRatings } from '../../types/review';

interface DetailedRatingsDisplayProps {
  overallRating: number;
  detailedRatings?: DetailedRatings;
}

const defaultRatings: DetailedRatings = {
  food: 0,
  service: 0,
  ambience: 0,
  value: 0,
  cleanliness: 0
};

export function DetailedRatingsDisplay({ 
  overallRating, 
  detailedRatings = defaultRatings 
}: DetailedRatingsDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const ratingCategories = [
    { key: 'food' as const, label: 'Food Quality' },
    { key: 'service' as const, label: 'Service' },
    { key: 'ambience' as const, label: 'Ambience' },
    { key: 'value' as const, label: 'Value' },
    { key: 'cleanliness' as const, label: 'Cleanliness' }
  ];

  // Only show the detailed ratings if at least one category has a rating
  const hasDetailedRatings = Object.values(detailedRatings).some(rating => rating > 0);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                'w-5 h-5',
                i < overallRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              )}
            />
          ))}
        </div>
        {hasDetailedRatings && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide details
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show details
              </>
            )}
          </button>
        )}
      </div>

      {isExpanded && hasDetailedRatings && (
        <div className="pl-1 space-y-2 animate-fade-in">
          {ratingCategories.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{label}</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-4 h-4',
                      i < (detailedRatings[key] || 0) ? 'text-yellow-400 fill-current' : 'text-gray-200'
                    )}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}