import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-neutral-100">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tighter">OptionEd</span>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider text-neutral-500">
              v1.0
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">Simulator</a>
            <a href="#" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">Levels</a>
          </nav>
        </div>
      </header>
      
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        {children}
      </main>
      
      <footer className="border-t border-neutral-100 py-12">
        <div className="mx-auto max-w-5xl px-6 text-center text-xs text-neutral-400 font-mono uppercase tracking-widest">
          OptionEd — Hyperminimalist Education for the Global Garage Sale
        </div>
      </footer>
    </div>
  );
};

export default Layout;
