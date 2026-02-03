import React, { useState } from "react";
import { Menu, X } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen bg-white font-sans text-neutral-900 selection:bg-neutral-100 overflow-hidden flex flex-col">
      {!isPresentationMode && (
        <header className="border-b border-neutral-100 bg-white shrink-0">
          <div className="mx-auto flex h-14 md:h-16 max-w-5xl items-center justify-between px-4 md:px-6">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 -ml-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="shrink-0">
              <span className="text-lg md:text-xl font-bold tracking-tighter">
                OptionsEd
              </span>
            </div>

            <div className="hidden md:block flex-1 px-8">{headerContent}</div>

            {/* Mobile spacer for centering logo */}
            <div className="md:hidden w-9" />
          </div>
        </header>
      )}

      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile sidebar overlay */}
        {!isPresentationMode && sidebarContent && (
          <>
            {/* Backdrop */}
            {isMobileMenuOpen && (
              <div
                className="md:hidden fixed inset-0 bg-black/20 z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            )}

            {/* Sidebar - fixed on mobile, static on desktop */}
            <aside
              className={`
                fixed md:static inset-y-0 left-0 z-50 md:z-0
                w-64 shrink-0 border-r border-neutral-100 bg-white md:bg-neutral-50/50
                overflow-y-auto transform transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                ${isPresentationMode ? 'hidden' : ''}
              `}
            >
              {/* Mobile header inside sidebar */}
              <div className="md:hidden flex items-center justify-between p-4 border-b border-neutral-100">
                <span className="text-lg font-bold tracking-tighter">OptionsEd</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div onClick={() => setIsMobileMenuOpen(false)}>
                {sidebarContent}
              </div>
            </aside>
          </>
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
