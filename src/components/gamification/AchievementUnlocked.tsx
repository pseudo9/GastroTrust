import React from 'react';
import { Trophy } from 'lucide-react';

interface AchievementUnlockedProps {
  title: string;
  description: string;
  points: number;
  onClose: () => void;
}

export function AchievementUnlocked({ 
  title, 
  description, 
  points, 
  onClose 
}: AchievementUnlockedProps) {
  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 w-80 animate-slide-up">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="p-2 bg-yellow-100 rounded-full">
            <Trophy className="w-6 h-6 text-yellow-600 animate-bounce" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900">Achievement Unlocked!</h3>
          <p className="text-sm font-medium text-gray-900 mt-1">{title}</p>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
          <p className="text-sm font-medium text-blue-600 mt-2">+{points} XP</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          ×
        </button>
      </div>
    </div>
  );
}
