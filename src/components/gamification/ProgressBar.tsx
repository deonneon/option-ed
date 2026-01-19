import React from 'react';

interface ProgressBarProps {
  percent: number;
  levelName: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent, levelName }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">Current Rank</span>
        <span className="text-xs font-bold uppercase tracking-tight">{levelName}</span>
      </div>
      <div className="h-1 w-full bg-neutral-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-neutral-900 transition-all duration-1000 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
