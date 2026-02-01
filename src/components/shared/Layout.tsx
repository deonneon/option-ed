import React from "react";
import PresentationProgressTracker from "./PresentationProgressTracker";
import type { Module } from "../../lib/progression";

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
}

const Layout: React.FC<LayoutProps> = ({
  children,
  headerContent,
  sidebarContent,
  isPresentationMode,
  presentationProgress,
}) => {
  return (
    <div className="h-screen bg-white font-sans text-neutral-900 selection:bg-neutral-100 overflow-hidden flex flex-col">
      {!isPresentationMode && (
        <header className="border-b border-neutral-100 bg-white shrink-0">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
            <div className="shrink-0">
              <span className="text-xl font-bold tracking-tighter">
                OptionsEd
              </span>
            </div>

            <div className="flex-1 px-8">{headerContent}</div>
          </div>
        </header>
      )}

      <div className="flex-1 flex overflow-hidden">
        {!isPresentationMode && sidebarContent && (
          <aside className="w-64 shrink-0 border-r border-neutral-100 bg-neutral-50/50 overflow-y-auto">
            {sidebarContent}
          </aside>
        )}
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>

      {isPresentationMode && presentationProgress && (
        <PresentationProgressTracker {...presentationProgress} />
      )}
    </div>
  );
};

export default Layout;
