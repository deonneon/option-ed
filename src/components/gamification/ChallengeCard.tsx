import React from 'react';
import { Trophy, Star, Lock } from 'lucide-react';
import type { Level } from '../../lib/progression';

interface ChallengeCardProps {
  level: Level;
  isUnlocked: boolean;
  isActive: boolean;
  onSelect?: () => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ 
  level, 
  isUnlocked, 
  isActive,
  onSelect 
}) => {
  return (
    <div 
      className={`relative p-5 rounded-2xl border transition-all ${
        isActive 
          ? 'bg-neutral-900 border-neutral-900 shadow-xl' 
          : isUnlocked 
            ? 'bg-white border-neutral-100 hover:border-neutral-300 cursor-pointer' 
            : 'bg-neutral-50 border-neutral-100 opacity-60 grayscale'
      }`}
      onClick={isUnlocked ? onSelect : undefined}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${
          isActive ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-400'
        }`}>
          {isUnlocked ? <Star className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
        </div>
        {level.requiredPnl > 0 && (
          <div className={`text-[10px] font-mono font-bold px-2 py-1 rounded-full ${
            isActive ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-500'
          }`}>
            ${level.requiredPnl} P/L REQ
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className={`text-[10px] font-mono uppercase tracking-widest ${
          isActive ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          Level {level.id}
        </div>
        <h4 className={`text-sm font-bold ${
          isActive ? 'text-white' : 'text-neutral-900'
        }`}>
          {level.title}
        </h4>
        <p className={`text-xs leading-relaxed ${
          isActive ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          {level.description}
        </p>
      </div>

      {isActive && (
        <div className="mt-4 flex items-center gap-2 text-[10px] font-mono font-bold text-white uppercase tracking-widest">
          <Trophy className="w-3 h-3" />
          Current Objective
        </div>
      )}
    </div>
  );
};

export default ChallengeCard;
