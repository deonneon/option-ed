import React from 'react';
import PresentationProgressTracker from './PresentationProgressTracker';
import type { Module, ContentVariant } from '../../lib/progression';

interface PresentationProgress {
  modules: Module[];
  currentModuleIdx: number;
  currentStepIdx: number;
  onNavigate: (moduleIdx: number, stepIdx: number) => void;
  onExit: () => void;
}

interface LayoutProps {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  sidebarContent?: React.ReactNode;
  isPresentationMode?: boolean;
  presentationProgress?: PresentationProgress;
  contentVariant?: ContentVariant;
  onContentVariantChange?: (variant: ContentVariant) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  headerContent,
  sidebarContent,
  isPresentationMode,
  presentationProgress,
  contentVariant = 'default',
  onContentVariantChange,
}) => {
  return (
    <div className="h-screen bg-white font-sans text-neutral-900 selection:bg-neutral-100 overflow-hidden flex flex-col">
      {!isPresentationMode && (
        <header className="border-b border-neutral-100 bg-white shrink-0">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
            <div className="shrink-0">
              <span className="text-xl font-bold tracking-tighter">OptionEd</span>
            </div>

            <div className="flex-1 px-8">
              {headerContent}
            </div>
          </div>
        </header>
      )}

      <div className="flex-1 flex overflow-hidden">
        {!isPresentationMode && sidebarContent && (
          <aside className="w-64 shrink-0 border-r border-neutral-100 bg-neutral-50/50 overflow-y-auto flex flex-col">
            <div className="flex-1">
              {sidebarContent}
            </div>
            {onContentVariantChange && (
              <div className="p-4 border-t border-neutral-100">
                <div className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                  Content Style
                </div>
                <div className="flex gap-1 p-1 bg-neutral-100 rounded-lg">
                  <button
                    onClick={() => onContentVariantChange('default')}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                      contentVariant === 'default'
                        ? 'bg-white text-neutral-900 shadow-sm'
                        : 'text-neutral-500 hover:text-neutral-700'
                    }`}
                  >
                    Default
                  </button>
                  <button
                    onClick={() => onContentVariantChange('tech')}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                      contentVariant === 'tech'
                        ? 'bg-white text-neutral-900 shadow-sm'
                        : 'text-neutral-500 hover:text-neutral-700'
                    }`}
                  >
                    Tech Bros
                  </button>
                </div>
              </div>
            )}
          </aside>
        )}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>

      {isPresentationMode && presentationProgress && (
        <PresentationProgressTracker {...presentationProgress} />
      )}
    </div>
  );
};

export default Layout;
