import React from 'react';
import { Award, Camera, Star, Utensils, Shield } from 'lucide-react';
import { cn } from '../../lib/utils';

export type BadgeType = 
  | 'expert'
  | 'photographer'
  | 'top-reviewer'
  | 'cuisine-specialist'
  | 'verified'
  | 'local-expert'; // Added missing badge type

interface BadgeConfig {
  icon: React.ElementType;
  label: string;
  description: string;
  color: string;
}

const BADGE_CONFIGS: Record<BadgeType, BadgeConfig> = {
  expert: {
    icon: Award,
    label: 'Expert Reviewer',
    description: 'Consistently provides detailed, high-quality reviews',
    color: 'text-yellow-500 bg-yellow-100'
  },
  photographer: {
    icon: Camera,
    label: 'Food Photographer',
    description: 'Known for high-quality food photography',
    color: 'text-blue-500 bg-blue-100'
  },
  'top-reviewer': {
    icon: Star,
    label: 'Top Reviewer',
    description: 'In the top 1% of reviewers',
    color: 'text-purple-500 bg-purple-100'
  },
  'cuisine-specialist': {
    icon: Utensils,
    label: 'Cuisine Specialist',
    description: 'Expert in specific cuisines',
    color: 'text-green-500 bg-green-100'
  },
  verified: {
    icon: Shield,
    label: 'Verified Reviewer',
    description: 'Identity and reviews verified',
    color: 'text-indigo-500 bg-indigo-100'
  },
  'local-expert': {
    icon: Award,
    label: 'Local Expert',
    description: 'Deep knowledge of local food scene',
    color: 'text-orange-500 bg-orange-100'
  }
};

interface ReviewerBadgeProps {
  type: BadgeType;
  animate?: boolean;
}

export function ReviewerBadge({ type, animate = false }: ReviewerBadgeProps) {
  const config = BADGE_CONFIGS[type];
  
  // Add safety check
  if (!config) {
    console.warn(`Invalid badge type: ${type}`);
    return null;
  }

  const Icon = config.icon;

  return (
    <div className="group relative inline-block">
      <div 
        className={cn(
          "p-1.5 rounded-lg transition-transform",
          config.color,
          animate && "hover:scale-110"
        )}
      >
        <Icon className="w-4 h-4" />
      </div>
      
      <div className="hidden group-hover:block absolute z-10 w-48 p-2 mt-2 text-sm bg-white rounded-lg shadow-lg border border-gray-100 -left-20">
        <p className="font-semibold">{config.label}</p>
        <p className="text-gray-600 text-xs mt-1">{config.description}</p>
      </div>
    </div>
  );
}