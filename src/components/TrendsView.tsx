import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, MapPin, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const mockTrends = [
  { crop: 'Maize (90kg)', markets: [
    { name: 'Nairobi', price: 5200, change: 4.2 },
    { name: 'Eldoret', price: 4600, change: -1.5 },
    { name: 'Kisumu', price: 4900, change: 2.1 }
  ]},
  { crop: 'Beans (90kg)', markets: [
    { name: 'Nairobi', price: 11500, change: 6.8 },
    { name: 'Mombasa', price: 12200, change: 3.5 },
    { name: 'Nakuru', price: 10800, change: -0.5 }
  ]},
  { crop: 'Onions (1kg)', markets: [
    { name: 'Wakulima', price: 120, change: 12.0 },
    { name: 'Eldoret', price: 85, change: 0.0 },
    { name: 'Kisumu', price: 110, change: 5.4 }
  ]}
];

export const TrendsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-2xl border border-primary/10 dark:border-primary/20">
        <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          Real-time Market Trends
        </h3>
        <p className="text-sm text-text-muted">Live price monitoring across major Kenyan hubs.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockTrends.map((trend, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-card border border-border rounded-xl p-5 shadow-sm transition-colors"
          >
            <h4 className="font-bold text-lg text-text-main mb-4 border-b border-stone-50 dark:border-stone-800 pb-2 transition-colors">{trend.crop}</h4>
            <div className="space-y-4">
              {trend.markets.map((m, j) => (
                <div key={j} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-text-muted" />
                    <span className="font-medium text-stone-700 dark:text-stone-300 transition-colors">{m.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-text-main">KES {m.price.toLocaleString()}</span>
                    <span className={`flex items-center text-xs font-bold px-2 py-0.5 rounded ${
                      m.change > 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {m.change > 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                      {Math.abs(m.change)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
