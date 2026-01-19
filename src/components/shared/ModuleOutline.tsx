import React from 'react';
import { Check } from 'lucide-react';
import type { Module } from '../../lib/progression';

interface ModuleOutlineProps {
  modules: Module[];
  currentModuleIdx: number;
  currentStepIdx: number;
  onNavigate: (moduleIdx: number, stepIdx: number) => void;
}

const ModuleOutline: React.FC<ModuleOutlineProps> = ({
  modules,
  currentModuleIdx,
  currentStepIdx,
  onNavigate,
}) => {
  return (
    <div className="p-4">
      <div className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4 px-2">
        Modules
      </div>
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
  );
};

export default ModuleOutline;
