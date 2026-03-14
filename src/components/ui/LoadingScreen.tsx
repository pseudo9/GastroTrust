import React, { useEffect, useState } from 'react';
import { Shield, Star } from 'lucide-react';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-blue-600 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6 animate-bounce">
          <Shield className="w-16 h-16 text-white" />
          <Star className="w-12 h-12 text-yellow-400 -ml-4" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">GastroTrust</h1>
        <div className="w-64 h-2 bg-blue-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
