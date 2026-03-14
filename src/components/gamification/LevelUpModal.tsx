import React from 'react';
import { Award, Star } from 'lucide-react';

interface LevelUpModalProps {
  level: number;
  rewards: string[];
  onClose: () => void;
}

export function LevelUpModal({ level, rewards, onClose }: LevelUpModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 animate-scale-up">
        <div className="text-center">
          <div className="relative inline-block">
            <Award className="w-16 h-16 text-yellow-500 animate-spin-slow" />
            <Star className="w-8 h-8 text-yellow-400 absolute top-0 right-0 animate-ping" />
          </div>
          
          <h2 className="text-2xl font-bold mt-4 mb-2">Level Up!</h2>
          <p className="text-4xl font-bold text-blue-600 mb-6">Level {level}</p>
          
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-gray-900">New Rewards Unlocked:</h3>
            <ul className="space-y-2">
              {rewards.map((reward, index) => (
                <li 
                  key={index}
                  className="flex items-center justify-center gap-2 text-gray-700 animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <Star className="w-4 h-4 text-yellow-500" />
                  {reward}
                </li>
              ))}
            </ul>
          </div>
          
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
