'use client';

import React from 'react';
import { ArrowLeft, Dumbbell } from 'lucide-react';
import { useRouter } from 'next/navigation';
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const onBack = () => {
    router.push('/signin');
  };
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl flex flex-col relative">
        <header className="sticky top-0 z-10 bg-white border-b border-slate-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <h1 className="text-xl font-bold text-slate-800">
              RMancer Dashboard
            </h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
            <Dumbbell className="w-5 h-5 text-indigo-600" />
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
