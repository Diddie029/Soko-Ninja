import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Handshake, 
  CloudSun, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { translations, Language } from '../translations';

interface AnalysisResult {
  summary: string;
  marketComparison: {
    title: string;
    content: string;
    bestMarket: string;
  };
  trends: {
    title: string;
    prediction: string;
    recommendation: string;
  };
  negotiation: {
    minPrice: string;
    phrases: string[];
    advice: string;
  };
  weather: {
    impact: string;
  };
  finalRecommendation: string;
}

interface OutputSectionProps {
  result: AnalysisResult | null;
  language: Language;
}

export const OutputSection: React.FC<OutputSectionProps> = ({ result, language }) => {
  const t = translations[language];
  if (!result) return null;

  return (
    <div className="space-y-6">
      {/* Top 4 Insights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
        {/* Best Market */}
        <div className="bg-white dark:bg-card p-5 rounded-xl border border-border shadow-sm border-l-4 border-l-primary transition-colors">
          <h4 className="text-[10px] uppercase font-bold tracking-wider text-text-muted mb-1">{t.bestMarket}</h4>
          <div className="text-lg font-extrabold text-text-main">{result.marketComparison.bestMarket}</div>
          <div className="mt-2 inline-block px-2 py-0.5 rounded bg-primary-light text-primary text-[10px] font-bold transition-colors">
             {result.marketComparison.title}
          </div>
        </div>

        {/* Price Trend */}
        <div className="bg-white dark:bg-card p-5 rounded-xl border border-border shadow-sm border-l-4 border-l-primary transition-colors">
          <h4 className="text-[10px] uppercase font-bold tracking-wider text-text-muted mb-1">{t.priceTrend}</h4>
          <div className="text-lg font-extrabold text-primary">{result.trends.prediction}</div>
          <div className="text-[10px] text-text-muted mt-1 italic">{result.trends.recommendation}</div>
        </div>

        {/* Minimum Price (Warning) */}
        <div className="bg-white dark:bg-card p-5 rounded-xl border border-border shadow-sm border-l-4 border-l-accent transition-colors">
          <h4 className="text-[10px] uppercase font-bold tracking-wider text-text-muted mb-1">{t.minPrice}</h4>
          <div className="text-lg font-extrabold text-text-main">{result.negotiation.minPrice}</div>
          <p className="text-[10px] text-text-muted mt-1">{result.negotiation.advice}</p>
        </div>

        {/* Final Recommendation */}
        <div className="bg-white dark:bg-card p-5 rounded-xl border border-border shadow-sm border-l-4 border-l-primary transition-colors">
          <h4 className="text-[10px] uppercase font-bold tracking-wider text-text-muted mb-1">{t.recommendation}</h4>
          <div className="text-lg font-extrabold text-text-main">📍 Final Verdict</div>
          <p className="text-[10px] text-text-muted mt-1 line-clamp-2">{result.finalRecommendation}</p>
        </div>
      </div>

      {/* Chatbot Box */}
      <div className="bg-[#1e293b] rounded-2xl p-6 shadow-xl text-left transition-all">
        <div className="flex items-center gap-2 font-bold text-accent text-sm mb-3">
          <span>🤖</span>
          <span>{t.negoAdvisor}</span>
        </div>
        <div className="text-[#e2e8f0] text-sm italic leading-relaxed border-l-2 border-stone-700 pl-4 py-1">
          "{result.summary}"
        </div>
        
        <div className="flex gap-2 mt-6">
          <button className="bg-white/10 hover:bg-white/15 text-white/80 text-[10px] font-semibold px-3 py-1.5 rounded-full transition-colors">
            {t.transport}
          </button>
          <button className="bg-white/10 hover:bg-white/15 text-white/80 text-[10px] font-semibold px-3 py-1.5 rounded-full transition-colors">
            {t.negoTips}
          </button>
        </div>
      </div>

      {/* Phrases Card */}
      <div className="bg-[#fffbeb] dark:bg-amber-950/20 border border-[#fef3c7] dark:border-amber-900/30 rounded-xl p-5 shadow-sm text-left transition-colors">
        <h4 className="text-[11px] font-bold text-[#92400e] dark:text-amber-200 mb-3 uppercase tracking-wide flex items-center gap-2">
          🤝 {t.negoPhrases}
        </h4>
        <ul className="space-y-2">
          {result.negotiation.phrases.map((phrase, i) => (
            <li key={i} className="text-sm text-[#92400e] dark:text-amber-300 flex items-start gap-2">
              <span className="shrink-0 mt-1">•</span>
              <span>"{phrase}"</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Weather Insight */}
      <div className="bg-white dark:bg-card p-5 rounded-xl border border-border shadow-sm text-left transition-colors">
        <div className="flex items-center gap-2 mb-3">
          <CloudSun className="w-5 h-5 text-[#0369a1] dark:text-sky-400" />
          <h4 className="text-[11px] uppercase font-bold text-text-muted">{t.weatherImpact}</h4>
        </div>
        <p className="text-xs text-text-main font-medium leading-relaxed">
          {result.weather.impact}
        </p>
      </div>
    </div>
  );
};
