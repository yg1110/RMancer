'use client';

import { CheckCircle2, Play } from 'lucide-react';

type WorkoutControlButtonProps = {
  isWorkingOut: boolean;
  onStart: () => void;
  onFinish: () => void;
};

export function WorkoutControlButton({
  isWorkingOut,
  onStart,
  onFinish,
}: WorkoutControlButtonProps) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-md right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200">
      <div className="max-w-md mx-auto w-full p-3">
        {!isWorkingOut ? (
          <button
            onClick={onStart}
            className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all"
          >
            <Play className="fill-current w-4 h-4" /> 오늘의 운동 시작하기
          </button>
        ) : (
          <button
            onClick={onFinish}
            className="w-full py-5 bg-emerald-500 text-white rounded-[1.5rem] font-black shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 hover:bg-emerald-600 active:scale-95 transition-all"
          >
            <CheckCircle2 className="w-5 h-5" /> 운동 완료 및 성장 분석
          </button>
        )}
      </div>
    </div>
  );
}

