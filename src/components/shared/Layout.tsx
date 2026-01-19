import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  sidebarContent?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, headerContent, sidebarContent }) => {
  return (
    <div className="h-screen bg-white font-sans text-neutral-900 selection:bg-neutral-100 overflow-hidden flex flex-col">
      <header className="border-b border-neutral-100 bg-white shrink-0">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="shrink-0">
            <span className="text-xl font-bold tracking-tighter">OptionEd</span>
          </div>

          <div className="flex-1 max-w-md px-8">
            {headerContent}
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {sidebarContent && (
          <aside className="w-64 shrink-0 border-r border-neutral-100 bg-neutral-50/50 overflow-y-auto">
            {sidebarContent}
          </aside>
        )}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
