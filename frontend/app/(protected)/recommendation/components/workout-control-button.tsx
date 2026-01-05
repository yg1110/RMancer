'use client';

import { CheckCircle2, Play, X } from 'lucide-react';

type WorkoutControlButtonProps = {
  isWorkingOut: boolean;
  onStart: () => void;
  onFinish: () => void;
  onCancel: () => void;
  disabled?: boolean;
  isDayCompleted?: boolean;
};

export function WorkoutControlButton({
  isWorkingOut,
  onStart,
  onFinish,
  onCancel,
  disabled = false,
  isDayCompleted = false,
}: WorkoutControlButtonProps) {
  return (
    <div className="fixed w-full bottom-0 left-1/2 -translate-x-1/2 max-w-md right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200">
      <div className="max-w-md mx-auto w-full p-3">
        {!isWorkingOut ? (
          <button
            onClick={onStart}
            disabled={isDayCompleted}
            className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:bg-slate-300"
          >
            <Play className="fill-current w-4 h-4" /> 오늘의 운동 시작하기
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={onFinish}
              disabled={disabled}
              className="w-full py-5 bg-emerald-500 text-white rounded-[1.5rem] font-black shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 hover:bg-emerald-600 active:scale-95 transition-all disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:bg-slate-300"
            >
              <CheckCircle2 className="w-5 h-5" /> 운동 완료 및 성장 분석
            </button>
            <button
              onClick={onCancel}
              className="w-[50%] py-5 bg-red-400 text-white rounded-[1.5rem] font-black shadow-lg shadow-red-100 flex items-center justify-center gap-2 hover:bg-red-600 active:scale-95 transition-all disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:bg-slate-300"
            >
              <X className="w-5 h-5" /> 운동 취소
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
