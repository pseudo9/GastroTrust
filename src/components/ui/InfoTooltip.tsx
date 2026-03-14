import React from 'react';
import { Info } from 'lucide-react';

interface InfoTooltipProps {
  title: string;
  content: React.ReactNode;
}

export function InfoTooltip({ title, content }: InfoTooltipProps) {
  return (
    <div className="group relative inline-block">
      <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors">
        <Info className="w-4 h-4" />
      </button>
      
      <div className="hidden group-hover:block absolute z-50 w-72 p-4 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 right-0">
        <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
        <div className="text-sm text-gray-600">
          {content}
        </div>
      </div>
    </div>
  );
}
