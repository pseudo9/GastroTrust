import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StarRatingProps {
  rating: number;
  onChange: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  description?: string;
}

export function StarRating({
  rating,
  onChange,
  size = 'md',
  label,
  description
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div>
      {label && (
        <div className="mb-1">
          <span className="font-medium text-gray-700">{label}</span>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
      )}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              className={cn(
                sizeClasses[size],
                value <= rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}