import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, ArrowRight } from 'lucide-react';

interface StoryOutcomeProps {
  initialPrice: number;
  currentPrice: number;
  pnl: number;
  isProfit: boolean;
}

const StoryOutcome: React.FC<StoryOutcomeProps> = ({ initialPrice, currentPrice, pnl, isProfit }) => {
  const priceDiff = currentPrice - initialPrice;
  const percentChange = ((currentPrice - initialPrice) / initialPrice) * 100;

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Price Comparison Row */}
      <div className="flex items-center gap-8 md:gap-12">
        <div className="text-center space-y-1">
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-300 block font-bold">Entry Price</span>
          <div className="text-2xl md:text-3xl font-mono font-medium tracking-tight text-neutral-300">${initialPrice.toFixed(0)}</div>
        </div>

        <div className="flex flex-col items-center">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            className="h-px bg-neutral-100 relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
              <ArrowRight className="w-4 h-4 text-neutral-200" />
            </div>
          </motion.div>
          <span className={`text-[10px] font-mono font-bold mt-2 uppercase tracking-[0.15em] ${priceDiff > 0 ? 'text-emerald-400' : priceDiff < 0 ? 'text-rose-400' : 'text-neutral-200'}`}>
            {priceDiff > 0 ? '+' : ''}{percentChange.toFixed(1)}%
          </span>
        </div>

        <div className="text-center space-y-1">
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400 block font-bold">New Value</span>
          <motion.div
            key={currentPrice}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-2xl md:text-3xl font-mono font-bold tracking-tight ${priceDiff > 0 ? 'text-emerald-500' : priceDiff < 0 ? 'text-rose-500' : 'text-neutral-900'}`}
          >
            ${currentPrice.toFixed(0)}
          </motion.div>
        </div>
      </div>

      {/* Outcome Medal */}
      <motion.div
        key={pnl}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="relative"
      >
        <div className={`px-10 md:px-12 py-6 md:py-8 rounded-[2rem] border transition-all duration-1000 ${
          isProfit
            ? 'bg-emerald-50/40 border-emerald-100 shadow-[0_20px_40px_-12px_rgba(16,185,129,0.1)]'
            : pnl < 0
              ? 'bg-rose-50/40 border-rose-100 shadow-[0_20px_40px_-12px_rgba(244,63,94,0.1)]'
              : 'bg-neutral-50/50 border-neutral-100'
        }`}>
          <span className={`block text-[10px] font-mono uppercase tracking-[0.2em] mb-2 font-bold ${
            isProfit ? 'text-emerald-500' : pnl < 0 ? 'text-rose-500' : 'text-neutral-400'
          }`}>
            Trade Result
          </span>

          <div className={`text-4xl md:text-5xl font-mono font-bold tracking-tighter ${
            isProfit ? 'text-emerald-600' : pnl < 0 ? 'text-rose-600' : 'text-neutral-900'
          }`}>
            {pnl >= 0 ? '+' : '-'}${Math.abs(pnl).toFixed(0)}
          </div>
        </div>

        {/* Floating Icon Medal */}
        <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transform rotate-12 ${
          isProfit ? 'bg-emerald-500 text-white' : pnl < 0 ? 'bg-rose-500 text-white' : 'bg-neutral-900 text-white'
        }`}>
          {isProfit ? <TrendingUp className="w-5 h-5" /> : pnl < 0 ? <TrendingDown className="w-5 h-5" /> : <Minus className="w-5 h-5" />}
        </div>
      </motion.div>
    </div>
  );
};

export default StoryOutcome;
