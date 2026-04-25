import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Handshake, MessageCircle, Info } from 'lucide-react';
import { translations, Language } from '../translations';

const scenarios = [
  { 
    title: "The Middleman 'Broker'", 
    description: "Broker is offering KES 3,800 but Nairobi price is KES 4,500.",
    agentLines: ["Sema mkulima, soko hapa Eldoret imekauka. KES 3,800 ndio top leo.", "Ukipelek Nairobi utapata gharama ya transport itakumaliza."],
    hints: ["Mention transport costs explicitly", "Quality of grain is high", "You know the Nairobi price is 4,500"]
  },
  { 
    title: "The Major Miller Buyers", 
    description: "Big factory wants bulk for less.",
    agentLines: ["Tunanunua kwa wingi, so tunataka discount kiasi.", "KES 4,000 for everything, cash on delivery."],
    hints: ["Volume discount should be limited", "Ask for weekly supply contract", "Mention competition"]
  }
];

interface NegotiationViewProps {
  language: Language;
}

export const NegotiationView: React.FC<NegotiationViewProps> = ({ language }) => {
  const t = translations[language];
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-accent/10 dark:bg-accent/20 p-6 rounded-2xl border border-accent/20 dark:border-accent/30 transition-colors">
        <h3 className="text-xl font-bold text-secondary dark:text-accent mb-2 flex items-center gap-2">
          <Handshake className="w-6 h-6" />
          {t.negotiationHub}
        </h3>
        <p className="text-sm text-text-muted">Practice your bargaining skills against common buyer tactics.</p>
      </div>

      <div className="space-y-4">
        {selected === null ? (
          scenarios.map((s, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(i)}
              className="w-full bg-white dark:bg-card border border-border dark:border-stone-800 rounded-xl text-left shadow-sm hover:border-primary transition-all p-5"
            >
              <h4 className="font-bold text-text-main text-lg mb-1">{s.title}</h4>
              <p className="text-sm text-text-muted">{s.description}</p>
            </motion.button>
          ))
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-card border border-border dark:border-stone-800 rounded-xl overflow-hidden transition-colors"
          >
            <div className="bg-stone-50 dark:bg-stone-900/50 p-4 border-b border-border dark:border-stone-800 flex justify-between items-center transition-colors">
              <h4 className="font-bold text-text-main">{scenarios[selected].title}</h4>
              <button onClick={() => setSelected(null)} className="text-xs text-primary font-bold">Change Scenario</button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                {scenarios[selected].agentLines.map((line, j) => (
                  <div key={j} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-800 shrink-0 flex items-center justify-center text-xs font-bold text-stone-500 transition-colors">B</div>
                    <div className="bg-stone-100 dark:bg-stone-800/80 p-3 rounded-2xl text-sm italic rounded-tl-none text-text-main transition-colors">
                      "{line}"
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-100 dark:border-stone-800 pt-6 transition-colors">
                <h5 className="text-[10px] uppercase font-bold text-text-muted tracking-widest mb-3 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Nego's Strategic Hints
                </h5>
                <ul className="space-y-2">
                  {scenarios[selected].hints.map((hint, k) => (
                    <li key={k} className="text-xs text-secondary dark:text-accent bg-secondary-light/30 dark:bg-accent/10 px-3 py-2 rounded-lg flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary dark:bg-accent shrink-0" />
                      {hint}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 pt-4">
                <input 
                  type="text" 
                  placeholder="Type your response..." 
                  className="flex-1 bg-stone-50 dark:bg-stone-900 border border-border dark:border-stone-800 rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary text-text-main transition-colors"
                />
                <button className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors shadow-md">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
