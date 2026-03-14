import React from 'react';
import { Shield } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AuthenticityBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function AuthenticityBadge({ 
  score, 
  size = 'md', 
  showIcon = true 
}: AuthenticityBadgeProps) {
  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-1.5',
    lg: 'text-lg px-4 py-2'
  };

  const colorClass = score >= 80 ? 'bg-green-100 text-green-800' :
                    score >= 60 ? 'bg-blue-100 text-blue-800' :
                                'bg-red-100 text-red-800';

  return (
    <div className={cn(
      'rounded-full font-medium inline-flex items-center gap-1.5',
      sizeClasses[size],
      colorClass
    )}>
      {showIcon && <Shield className="w-4 h-4" />}
      <span>{Math.round(score)}%</span>
    </div>
  );
}
