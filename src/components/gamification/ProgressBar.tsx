import React from 'react';

interface ProgressBarProps {
  percent: number;
  levelName: string;
  currentStep?: number;
  totalSteps?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent, levelName, currentStep, totalSteps }) => {
  const showCourseProgress = currentStep !== undefined && totalSteps !== undefined;
  const coursePercent = showCourseProgress ? Math.round((currentStep / totalSteps) * 100) : 0;

  return (
    <div className="w-full flex items-center gap-6">
      {/* Course Progress */}
      {showCourseProgress && (
        <div className="shrink-0 flex items-baseline gap-3">
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold tabular-nums">{currentStep}</span>
            <span className="text-[10px] text-neutral-400">/ {totalSteps}</span>
          </div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 whitespace-nowrap">
            {coursePercent}% complete
          </span>
        </div>
      )}

      {/* Rank Progress */}
      <div className="flex-1">
        <div className="flex justify-between items-end mb-2 gap-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 whitespace-nowrap">Current Rank</span>
          <span className="text-xs font-bold uppercase tracking-tight whitespace-nowrap">{levelName}</span>
        </div>
        <div className="h-1 w-full bg-neutral-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-neutral-900 transition-all duration-1000 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
