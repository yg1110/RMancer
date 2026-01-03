'use client';

import { Settings2, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ActionButtons() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={() => router.push('/selection')}
        className="py-5 bg-white border border-slate-200 rounded-3xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group shadow-sm"
      >
        <Zap className="w-4 h-4 text-amber-500" />
        <span className="text-[11px] font-black text-slate-600">
          프로그램 변경
        </span>
      </button>
      <button
        onClick={() => router.push('/dashboard?edit=true')}
        className="py-5 bg-white border border-slate-200 rounded-3xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group shadow-sm"
      >
        <Settings2 className="w-4 h-4 text-indigo-500" />
        <span className="text-[11px] font-black text-slate-600">
          기본 정보 수정
        </span>
      </button>
    </div>
  );
}

