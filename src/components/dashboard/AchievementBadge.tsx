import React from 'react';
import { Trophy, Camera, Utensils, Star, Medal } from 'lucide-react';
import { cn } from '../../lib/utils';

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

interface AchievementBadgeProps {
  name: string;
  description: string;
  icon: keyof typeof icons;
  tier: BadgeTier;
  progress?: number;
}

const icons = {
  Trophy,
  Camera,
  Utensils,
  Star,
  Medal
};

const tierColors: Record<BadgeTier, string> = {
  bronze: 'bg-amber-600',
  silver: 'bg-gray-400',
  gold: 'bg-yellow-500',
  platinum: 'bg-gradient-to-r from-teal-400 to-blue-500',
  diamond: 'bg-gradient-to-r from-purple-400 to-pink-500'
};

export function AchievementBadge({ name, description, icon, tier, progress }: AchievementBadgeProps) {
  const Icon = icons[icon];

  return (
    <div className="group relative">
      <div className={cn(
        'p-3 rounded-full shadow-lg transition-transform group-hover:scale-110',
        tierColors[tier]
      )}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      <div className="hidden group-hover:block absolute z-10 w-48 p-3 mt-2 bg-white rounded-lg shadow-xl">
        <h4 className="font-semibold text-gray-900">{name}</h4>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        {progress !== undefined && (
          <div className="mt-2">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className={cn("h-full rounded-full", tierColors[tier])}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{progress}% Complete</p>
          </div>
        )}
      </div>
    </div>
  );
}
