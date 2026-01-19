import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, X } from 'lucide-react';
import type { Level } from '../../lib/progression';

interface AchievementToastProps {
  level: Level | null;
  onClose: () => void;
}

const AchievementToast: React.FC<AchievementToastProps> = ({ level, onClose }) => {
  useEffect(() => {
    if (level) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [level, onClose]);

  return (
    <AnimatePresence>
      {level && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed bottom-8 right-8 z-[100] w-80"
        >
          <div className="bg-neutral-900 border border-neutral-800 text-white p-6 rounded-3xl shadow-2xl overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-16 -mt-16" />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-3 bg-white/10 rounded-2xl">
                <Trophy className="w-6 h-6 text-yellow-400" />
              </div>
              <button 
                onClick={onClose}
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative z-10">
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-neutral-500 mb-1">
                New Rank Unlocked
              </div>
              <h4 className="text-xl font-bold mb-2">{level.title}</h4>
              <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                {level.description}
              </p>
              
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-yellow-400 uppercase tracking-widest bg-yellow-400/10 w-fit px-3 py-1.5 rounded-full">
                <Star className="w-3 h-3 fill-current" />
                Mastery Level {level.id}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementToast;
