import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { translations, Language } from '../translations';

interface InputSectionProps {
  onAnalyze: (data: string) => void;
  loading: boolean;
  language: Language;
}

const COUNTIES = [
  'Nairobi', 'Mombasa', 'Nakuru', 'Uasin Gishu (Eldoret)', 'Kisumu', 
  'Kiambu', 'Meru', 'Machakos', 'Narok', 'Trans Nzoia', 'Bungoma', 'Baringo', 'Embu', 'Nyeri'
];
const LEVELS = ['Low', 'Medium', 'High'];

export const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, loading, language }) => {
  const t = translations[language];
  const [formData, setFormData] = useState({
    crop: '',
    location: '',
    weather: '',
    demand: 'Medium',
    supply: 'Medium',
    otherPrices: ''
  });

  // Mock weather pre-fill logic based on location
  useEffect(() => {
    if (formData.location) {
      const weatherMap: Record<string, string> = {
        'Nairobi': 'Cool with light showers',
        'Mombasa': 'Hot and humid, clear skies',
        'Nakuru': 'Overcast, potential rain in the evening',
        'Uasin Gishu (Eldoret)': 'Heavy rainfall expected in Western highlands',
        'Narok': 'Dry and windy',
        'Trans Nzoia': 'Ongoing rains affecting harvesting',
      };
      setFormData(prev => ({ 
        ...prev, 
        weather: weatherMap[formData.location] || 'Moderate weather, seasonal patterns' 
      }));
    }
  }, [formData.location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataString = `
      Crop: ${formData.crop}
      Location: ${formData.location}
      Weather: ${formData.weather}
      Demand: ${formData.demand}
      Supply: ${formData.supply}
      Context: ${formData.otherPrices}
    `.trim();
    
    if (formData.crop && formData.location && !loading) {
      onAnalyze(dataString);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Crop Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider ml-1">{t.cropName}</label>
            <input
              type="text"
              value={formData.crop}
              onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
              placeholder="e.g. Maize, Beans..."
              className="w-full p-3 rounded-lg border border-border dark:border-stone-800 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm bg-white dark:bg-stone-900 transition-colors"
              required
            />
          </div>

          {/* Location Selection */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider ml-1">{t.marketLocation}</label>
            <select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-3 rounded-lg border border-border dark:border-stone-800 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm bg-white dark:bg-stone-900 transition-colors"
              required
            >
              <option value="">{t.selectCounty}</option>
              {COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Weather Prefilled */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider ml-1">{t.weatherContext}</label>
          <input
            type="text"
            value={formData.weather}
            onChange={(e) => setFormData({ ...formData, weather: e.target.value })}
            className="w-full p-3 rounded-lg border border-border dark:border-stone-800 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm bg-stone-50 dark:bg-stone-900 transition-colors"
            placeholder={t.weatherContext}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Demand */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider ml-1">{t.localDemand}</label>
            <select
              value={formData.demand}
              onChange={(e) => setFormData({ ...formData, demand: e.target.value })}
              className="w-full p-3 rounded-lg border border-border dark:border-stone-800 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm bg-white dark:bg-stone-900 transition-colors"
            >
              {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          {/* Supply */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider ml-1">{t.localSupply}</label>
            <select
              value={formData.supply}
              onChange={(e) => setFormData({ ...formData, supply: e.target.value })}
              className="w-full p-3 rounded-lg border border-border dark:border-stone-800 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm bg-white dark:bg-stone-900 transition-colors"
            >
              {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* Other context/Prices */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider ml-1">{t.additionalDetails}</label>
          <textarea
            value={formData.otherPrices}
            onChange={(e) => setFormData({ ...formData, otherPrices: e.target.value })}
            placeholder="e.g. Current local price in my village is 3,500..."
            className="w-full h-24 p-3 rounded-lg border border-border dark:border-stone-800 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm bg-[#fdfdfd] dark:bg-stone-900 transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !formData.crop || !formData.location}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-white transition-all active:scale-[0.98] ${
            loading || !formData.crop || !formData.location 
              ? 'bg-stone-300 dark:bg-stone-800 cursor-not-allowed text-stone-500' 
              : 'bg-primary hover:bg-primary/90 shadow-md'
          }`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>{t.analyze}</>
          )}
        </button>
      </form>
    </motion.section>
  );
};

