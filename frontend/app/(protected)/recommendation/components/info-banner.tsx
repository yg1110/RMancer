'use client';

import { Info } from 'lucide-react';

export function InfoBanner() {
  return (
    <div className="bg-indigo-50/30 p-5 rounded-3xl flex gap-3 border border-indigo-50">
      <Info className="w-4 h-4 text-indigo-300 shrink-0 mt-1" />
      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
        모든 중량은 당신의 1RM 데이터를 기반으로 산출되었습니다.
        <br />
        당일 컨디션이 좋지 않다면 중량을 5% 가량 낮추고,
        <br />
        동작의 정확도에 집중하세요.
      </p>
    </div>
  );
}
