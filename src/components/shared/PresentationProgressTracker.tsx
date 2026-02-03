import React from 'react';
import { Check, Minimize2 } from 'lucide-react';
import type { Module } from '../../lib/progression';

interface PresentationProgressTrackerProps {
  modules: Module[];
  currentModuleIdx: number;
  currentStepIdx: number;
  onNavigate: (moduleIdx: number, stepIdx: number) => void;
  onExit: () => void;
}

const PresentationProgressTracker: React.FC<PresentationProgressTrackerProps> = ({
  modules,
  currentModuleIdx,
  currentStepIdx,
  onNavigate,
  onExit,
}) => {
  const currentModule = modules[currentModuleIdx];
  const totalSteps = modules.reduce((acc, m) => acc + m.steps.length, 0);
  const completedSteps = modules
    .slice(0, currentModuleIdx)
    .reduce((acc, m) => acc + m.steps.length, 0) + currentStepIdx;
  const overallProgress = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className="group fixed left-0 top-0 h-full z-50">
      {/* Hover trigger zone - invisible but captures hover */}
      <div className="absolute left-0 top-0 h-full w-12 sm:w-16" />

      {/* Always-visible dots - hidden on very small screens */}
      <div className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 flex-col gap-2 z-10">
        {modules.map((_, moduleIdx) => {
          const isCurrent = moduleIdx === currentModuleIdx;
          const isCompleted = moduleIdx < currentModuleIdx;

          return (
            <div
              key={moduleIdx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isCurrent
                  ? 'bg-neutral-900 scale-125'
                  : isCompleted
                  ? 'bg-emerald-500'
                  : 'bg-neutral-300'
              }`}
            />
          );
        })}
      </div>

      {/* Slide-in panel */}
      <div className="absolute left-0 top-0 h-full w-[85vw] max-w-64 bg-white border-r border-neutral-200 shadow-xl transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out flex flex-col">
        {/* Header section */}
        <div className="p-4 border-b border-neutral-100">
          <div className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">
            Progress
          </div>
          <div className="text-sm font-medium text-neutral-900 mb-1">
            Module {currentModuleIdx + 1} of {modules.length}
          </div>
          <div className="text-xs text-neutral-500 mb-3">
            Step {currentStepIdx + 1} of {currentModule.steps.length}
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-neutral-900 rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className="text-[10px] text-neutral-400 mt-1 text-right">
            {overallProgress}% complete
          </div>
        </div>

        {/* Module nav list */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1">
            {modules.map((module, moduleIdx) => {
              const isCurrentModule = moduleIdx === currentModuleIdx;
              const isCompleted = moduleIdx < currentModuleIdx;
              const isLocked = moduleIdx > currentModuleIdx;

              return (
                <div key={module.id}>
                  <button
                    onClick={() => !isLocked && onNavigate(moduleIdx, 0)}
                    disabled={isLocked}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-3 ${
                      isCurrentModule
                        ? 'bg-neutral-900 text-white'
                        : isCompleted
                        ? 'text-neutral-600 hover:bg-neutral-100'
                        : 'text-neutral-300 cursor-not-allowed'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      isCurrentModule
                        ? 'bg-white text-neutral-900'
                        : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-neutral-200 text-neutral-400'
                    }`}>
                      {isCompleted ? <Check className="w-3 h-3" /> : moduleIdx}
                    </div>
                    <span className="text-sm font-medium truncate">{module.title}</span>
                  </button>

                  {/* Step indicators for current module */}
                  {isCurrentModule && (
                    <div className="ml-6 mt-1 mb-2 pl-4 border-l-2 border-neutral-200">
                      {module.steps.map((_, stepIdx) => {
                        const isCurrentStep = stepIdx === currentStepIdx;
                        const isStepCompleted = stepIdx < currentStepIdx;

                        return (
                          <button
                            key={stepIdx}
                            onClick={() => onNavigate(moduleIdx, stepIdx)}
                            className={`w-full text-left py-1.5 px-2 text-xs rounded transition-all ${
                              isCurrentStep
                                ? 'text-neutral-900 font-medium bg-neutral-100'
                                : isStepCompleted
                                ? 'text-neutral-500 hover:text-neutral-700'
                                : 'text-neutral-400'
                            }`}
                          >
                            Step {stepIdx + 1}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-100">
          <button
            onClick={onExit}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg transition-all text-sm font-medium"
          >
            <Minimize2 className="w-4 h-4" />
            Exit Presentation
          </button>
          <div className="text-[10px] text-neutral-400 text-center mt-2">
            Press ESC to exit
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentationProgressTracker;
