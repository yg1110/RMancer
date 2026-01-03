'use client';

import { Zap } from 'lucide-react';

type RoutineHeaderProps = {
  title: string;
};

export function RoutineHeader({ title }: RoutineHeaderProps) {
  return (
    <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
      <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center transition-colors">
        <Zap className="w-6 h-6 text-indigo-600" />
      </div>
      <div>
        <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-0.5">
          맞춤 운동 프로그램
        </h2>
        <p className="text-lg font-black text-slate-800 tracking-tight">
          {title}
        </p>
      </div>
    </div>
  );
}

