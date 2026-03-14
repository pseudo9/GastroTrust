import React from 'react';
import { StarRating } from './StarRating';
import type { DetailedRatings as DetailedRatingsType } from '../../types/review';

const RATING_CATEGORIES = [
  {
    id: 'food',
    label: 'Food Quality',
    description: 'Taste, presentation, and food temperature'
  },
  {
    id: 'service',
    label: 'Service',
    description: 'Staff friendliness, attentiveness, and efficiency'
  },
  {
    id: 'ambience',
    label: 'Ambience',
    description: 'Atmosphere, decor, noise level, and comfort'
  },
  {
    id: 'value',
    label: 'Value',
    description: 'Price in relation to quality and portion size'
  },
  {
    id: 'cleanliness',
    label: 'Cleanliness',
    description: 'Overall cleanliness of the restaurant and facilities'
  }
] as const;

interface DetailedRatingsProps {
  ratings: DetailedRatingsType;
  onChange: (category: keyof DetailedRatingsType, value: number) => void;
}

export function DetailedRatings({ ratings, onChange }: DetailedRatingsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Rate Your Experience</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RATING_CATEGORIES.map((category) => (
          <StarRating
            key={category.id}
            rating={ratings[category.id as keyof DetailedRatingsType]}
            onChange={(value) => onChange(category.id as keyof DetailedRatingsType, value)}
            label={category.label}
            description={category.description}
            size="md"
          />
        ))}
      </div>
    </div>
  );
}