'use client';

import { RoutineResponseDto } from '@/generated/openapi-client';

type DaySelectorProps = {
  days: RoutineResponseDto['days'];
  selectedDayIdx: number;
  completedDays: Set<number>;
  onSelectDay: (idx: number) => void;
};

export function DaySelector({
  days,
  selectedDayIdx,
  completedDays,
  onSelectDay,
}: DaySelectorProps) {
  if (!days) return null;
  return (
    <div className="py-4 -mx-6 px-6 border-b border-slate-100">
      <div className="flex flex-wrap gap-2 pb-1 scrollbar-hide">
        {days.map((day, idx) => {
          const isCompleted = completedDays.has(idx);
          return (
            <button
              key={day.id}
              onClick={() => onSelectDay(idx)}
              className={`shrink-0 px-6 py-2.5 rounded-2xl font-bold text-sm transition-all relative ${
                selectedDayIdx === idx
                  ? isCompleted
                    ? 'bg-emerald-600 text-white shadow-emerald-100'
                    : 'bg-indigo-600 text-white shadow-indigo-100'
                  : isCompleted
                    ? 'bg-emerald-50 text-emerald-600 border-2 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
              }`}
            >
              Day {idx + 1}
              {isCompleted && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
