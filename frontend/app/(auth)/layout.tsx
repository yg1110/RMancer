import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  showBack,
  onBack,
}) => {
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl flex flex-col relative">
        {title && (
          <header className="sticky top-0 z-10 bg-white border-b border-slate-100 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {showBack && (
                <button
                  onClick={onBack}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <i className="fas fa-arrow-left text-slate-600"></i>
                </button>
              )}
              <h1 className="text-xl font-bold text-slate-800">{title}</h1>
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
              <i className="fas fa-dumbbell text-indigo-600"></i>
            </div>
          </header>
        )}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
