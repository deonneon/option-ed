import React from 'react';
import { motion } from 'framer-motion';

interface TimeMachineProps {
  daysLeft: number;
}

const TimeMachine: React.FC<TimeMachineProps> = ({ daysLeft }) => {
  const meltProgress = 1 - (daysLeft / 30);
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* The "Ice Cube" */}
        <motion.div 
          animate={{ 
            scale: 1 - (meltProgress * 0.4),
            opacity: 1 - (meltProgress * 0.6),
            borderRadius: `${meltProgress * 50}%`
          }}
          className="w-12 h-12 bg-blue-100 border border-blue-200 shadow-inner flex items-center justify-center"
        >
          <div className="w-4 h-4 bg-white/50 rounded-full blur-[2px]" />
        </motion.div>
        
        {/* The "Puddle" */}
        <motion.div 
          animate={{ 
            scale: 0.5 + (meltProgress * 1.5),
            opacity: meltProgress * 0.4
          }}
          initial={{ opacity: 0 }}
          className="absolute bottom-0 w-8 h-2 bg-blue-200 rounded-full blur-[4px]"
        />
      </div>
      
      <div className="mt-4 text-center">
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">Hope Value</span>
        <div className="text-xs font-bold text-blue-500">
          {meltProgress > 0.9 ? 'EXTINGUISHED' : meltProgress > 0.5 ? 'MELTING FAST' : 'SOLID'}
        </div>
      </div>
    </div>
  );
};

export default TimeMachine;
