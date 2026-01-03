'use client';

import { ArrowUpRight, ChevronRight, Trophy } from 'lucide-react';

type GrowthSummaryProps = {
  onConfirm: () => void;
};

export function GrowthSummary({ onConfirm }: GrowthSummaryProps) {
  return (
    <div className="flex flex-col items-center py-6 space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-20">
      <div className="w-24 h-24 bg-amber-100 rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-amber-100">
        <Trophy className="w-12 h-12 text-amber-500" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-slate-800">
          운동 완료! 고생하셨습니다.
        </h2>
        <p className="text-slate-500 text-sm">
          성공적인 수행으로 당신의 잠재력이 깨어났습니다.
        </p>
      </div>
      <div className="w-full bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 space-y-6">
        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-widest text-center">
          예상 성장 수치
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-3xl border border-slate-100 text-center">
            <p className="text-[10px] font-bold text-slate-400 mb-1">
              근신경계 발달
            </p>
            <div className="flex items-center justify-center gap-1 text-emerald-500 font-black">
              <ArrowUpRight className="w-4 h-4" />
              <span>+0.8%</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-3xl border border-slate-100 text-center">
            <p className="text-[10px] font-bold text-slate-400 mb-1">
              권장 1RM 증량
            </p>
            <div className="flex items-center justify-center gap-1 text-indigo-600 font-black">
              <span>+2.5</span>
              <span className="text-xs">kg</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full space-y-3">
        <button
          onClick={onConfirm}
          className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 group"
        >
          기록 저장 및 종료{' '}
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

