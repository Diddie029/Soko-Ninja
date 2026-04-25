import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../translations';

interface LangSelectorProps {
  language: string;
  setLanguage: (lang: Language) => void;
}

const languages = [
  { value: 'English', label: 'English' },
  { value: 'Kiswahili', label: 'Kiswahili' },
  { value: 'Sheng', label: 'Sheng' },
  { value: 'Auto', label: 'Auto (Mix)' },
];

export const LangSelector: React.FC<LangSelectorProps> = ({ language, setLanguage }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer relative group">
      <Globe className="w-4 h-4" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="bg-transparent border-none outline-none font-medium text-sm cursor-pointer appearance-none pr-4"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value} className="bg-white dark:bg-stone-900">
            {lang.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
};
