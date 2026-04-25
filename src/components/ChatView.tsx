import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import { chatWithNego } from '../services/aiService';
import { translations, Language } from '../translations';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatViewProps {
  language: Language;
}

export const ChatView: React.FC<ChatViewProps> = ({ language }) => {
  const t = translations[language];
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Niaje mkulima! Mimi ni Nego. Una swali yoyote kuhusu soko leo?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const botResponse = await chatWithNego(input, language);
      const botMsg: Message = { id: (Date.now() + 1).toString(), text: botResponse, sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: Message = { id: (Date.now() + 1).toString(), text: "Pole, nashindwa kuunganishwa hivi sasa.", sender: 'bot' };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] xl:h-[600px] bg-white dark:bg-card border border-border rounded-2xl overflow-hidden shadow-sm transition-colors">
      <div className="bg-[#1e293b] dark:bg-card p-4 flex items-center gap-3 border-b border-border/10">
        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-secondary">
          <Bot className="w-6 h-6" />
        </div>
        <div className="text-left">
          <h3 className="text-white font-bold">{t.negoAdvisor}</h3>
          <p className="text-accent text-[10px] uppercase font-black tracking-widest">Active Now</p>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/50 dark:bg-stone-900/20"
      >
        <AnimatePresence>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[85%] ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  m.sender === 'user' ? 'bg-primary text-white' : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}>
                  {m.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`p-3 rounded-2xl text-sm shadow-sm ${
                  m.sender === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white dark:bg-stone-800 text-text-main border border-stone-100 dark:border-stone-700/50 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-2 items-center bg-white dark:bg-stone-800 p-3 rounded-2xl shadow-sm animate-pulse">
              <Sparkles className="w-4 h-4 text-accent" />
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-stone-300 dark:bg-stone-600 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-stone-300 dark:bg-stone-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-stone-300 dark:bg-stone-600 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-border flex gap-2 transition-colors">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.askNego}
          className="flex-1 bg-stone-50 dark:bg-stone-900 border border-border dark:border-stone-800 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary text-text-main transition-colors"
        />
        <button 
          disabled={loading || !input.trim()}
          className="bg-primary text-white p-2.5 rounded-lg disabled:opacity-50 transition-opacity shadow-md"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
