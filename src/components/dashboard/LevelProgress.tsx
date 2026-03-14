import React from 'react';
import { Trophy } from 'lucide-react';

interface LevelProgressProps {
  level: number;
  xp: number;
  nextLevelXp: number;
}

export function LevelProgress({ level, xp, nextLevelXp }: LevelProgressProps) {
  const progress = (xp / nextLevelXp) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <div>
            <h3 className="text-xl font-bold">Level {level}</h3>
            <p className="text-sm text-gray-600">Food Explorer</p>
          </div>
        </div>
        <span className="text-2xl font-bold text-blue-600">{xp} XP</span>
      </div>

      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block text-blue-600">
              Progress to Level {level + 1}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
          />
        </div>
        <p className="text-xs text-gray-500 text-right">
          {xp} / {nextLevelXp} XP
        </p>
      </div>
    </div>
  );
}
