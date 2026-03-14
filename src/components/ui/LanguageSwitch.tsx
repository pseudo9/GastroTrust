import React from 'react';
import { Languages } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export function LanguageSwitch() {
  const { language, setLanguage } = useAuthStore();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
    >
      <Languages className="w-4 h-4" />
      <span>{language.toUpperCase()}</span>
    </button>
  );
}
