import React, { useState, useEffect } from 'react';
import { LangSelector } from './components/LangSelector';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { TrendsView } from './components/TrendsView';
import { NegotiationView } from './components/NegotiationView';
import { ChatView } from './components/ChatView';
import { LayoutDashboard, MessageSquare, LineChart, Sparkles, AlertCircle, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeMarket, AnalysisResult } from './services/aiService';
import { translations, Language } from './translations';

type ViewType = 'dashboard' | 'trends' | 'negotiation' | 'chat';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [language, setLanguage] = useState<Language>('English');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const t = translations[language];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleAnalyze = async (data: string) => {
    setLoading(true);
    setError(null);
    try {
      const dataResult = await analyzeMarket(data, language);
      setResult(dataResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'trends':
        return <TrendsView />;
      case 'negotiation':
        return <NegotiationView language={language} />;
      case 'chat':
        return <ChatView language={language} />;
      default:
        return (
          <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-6 p-6 max-w-[1400px] mx-auto">
            {/* Input Side */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-card border border-border rounded-xl shadow-sm p-6 transition-colors">
                <h3 className="text-xl font-bold mb-1">{t.pasteData}</h3>
                <p className="text-sm text-text-muted mb-6">{t.enterDetails}</p>
                <InputSection onAnalyze={handleAnalyze} loading={loading} language={language} />
                
                {/* Regional Insight Box */}
                <div className="mt-8 bg-[#f0f9ff] dark:bg-sky-950/30 border border-[#bae6fd] dark:border-sky-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-[#0c4a6e] dark:text-sky-200">Regional Context</span>
                    <span className="text-xs font-medium text-[#0369a1] bg-[#e0f2fe] dark:bg-sky-800/50 px-2 py-0.5 rounded">Rift Valley</span>
                  </div>
                  <p className="text-xs text-[#0c4a6e] dark:text-sky-300 leading-relaxed">
                    Logistics may be impacted by seasonal shifts. Monitor transport routes for cost efficiency.
                  </p>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-2"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Results Side */}
            <div className="min-h-[400px] flex flex-col">
              {result ? (
                <OutputSection result={result} language={language} />
              ) : (
                <div className="flex-1 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-text-muted p-12 text-center bg-white dark:bg-card transition-colors">
                  <div className="w-16 h-16 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mb-4 transition-colors">
                    <LineChart className="w-8 h-8 opacity-20" />
                  </div>
                  <h4 className="font-bold text-lg text-text-main mb-2">{t.noAnalysis}</h4>
                  <p className="text-sm max-w-xs">{t.fillMarketData}</p>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden text-text-main font-sans bg-background transition-colors">
      {/* Header */}
      <header className="h-16 flex justify-between items-center px-6 bg-white dark:bg-card border-b border-border shadow-sm shrink-0 z-50 transition-colors">
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2 font-extrabold text-2xl text-primary tracking-tight cursor-pointer"
          >
            <span>SokoNinja</span>
            <span className="text-sm font-normal bg-primary-light text-primary px-2 py-0.5 rounded-md">v1.2</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-text-muted"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <LangSelector language={language} setLanguage={(l) => setLanguage(l as Language)} />
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <nav className="w-64 border-r border-border bg-white dark:bg-card py-6 hidden lg:flex flex-col shrink-0 transition-colors">
          <NavItem 
            icon={<LayoutDashboard className="w-5 h-5" />} 
            label={t.dashboard} 
            active={currentView === 'dashboard'} 
            onClick={() => setCurrentView('dashboard')}
          />
          <NavItem 
            icon={<LineChart className="w-5 h-5" />} 
            label={t.marketTrends} 
            active={currentView === 'trends'} 
            onClick={() => setCurrentView('trends')}
          />
          <NavItem 
            icon={<Sparkles className="w-5 h-5" />} 
            label={t.negotiationHub} 
            active={currentView === 'negotiation'} 
            onClick={() => setCurrentView('negotiation')}
          />
          <NavItem 
            icon={<MessageSquare className="w-5 h-5" />} 
            label={t.chatCenter} 
            active={currentView === 'chat'} 
            onClick={() => setCurrentView('chat')}
          />
        </nav>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className={`p-6 max-w-[1400px] mx-auto ${currentView !== 'dashboard' ? 'lg:px-12' : ''}`}>
            {renderView()}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-3 bg-white dark:bg-card border-t border-stone-100 dark:border-stone-800 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] backdrop-blur-lg transition-colors">
        <button onClick={() => setCurrentView('dashboard')} className={`flex flex-col items-center justify-center ${currentView === 'dashboard' ? 'text-primary' : 'text-stone-400'}`}>
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">{t.home}</span>
        </button>
        <button onClick={() => setCurrentView('trends')} className={`flex flex-col items-center justify-center ${currentView === 'trends' ? 'text-primary' : 'text-stone-400'}`}>
          <LineChart className="w-6 h-6" />
          <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">{t.trends}</span>
        </button>
        <button onClick={() => setCurrentView('negotiation')} className={`flex flex-col items-center justify-center ${currentView === 'negotiation' ? 'text-primary' : 'text-stone-400'}`}>
          <Sparkles className="w-6 h-6" />
          <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">{t.nego}</span>
        </button>
        <button onClick={() => setCurrentView('chat')} className={`flex flex-col items-center justify-center ${currentView === 'chat' ? 'text-primary' : 'text-stone-400'}`}>
          <MessageSquare className="w-6 h-6" />
          <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">{t.chat}</span>
        </button>
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <div onClick={onClick} className={`px-6 py-3.5 flex items-center gap-3 font-medium cursor-pointer transition-all border-r-4 ${
      active 
        ? 'text-primary bg-primary-light dark:bg-emerald-950/30 border-primary' 
        : 'text-text-muted border-transparent hover:text-text-main hover:bg-stone-50 dark:hover:bg-stone-800/50'
    }`}>
      {icon}
      <span>{label}</span>
    </div>
  );
}
