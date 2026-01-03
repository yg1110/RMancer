'use client';

import { RoutineResponseDto } from '@/generated/openapi-client';

type DaySelectorProps = {
  days: RoutineResponseDto['days'];
  selectedDayIdx: number;
  onSelectDay: (idx: number) => void;
};

export function DaySelector({
  days,
  selectedDayIdx,
  onSelectDay,
}: DaySelectorProps) {
  if (!days) return null;
  return (
    <div className="py-4 -mx-6 px-6 border-b border-slate-100">
      <div className="flex flex-wrap gap-2 pb-1 scrollbar-hide">
        {days.map((day, idx) => (
          <button
            key={day.id}
            onClick={() => onSelectDay(idx)}
            className={`shrink-0 px-6 py-2.5 rounded-2xl font-bold text-sm transition-all ${
              selectedDayIdx === idx
                ? 'bg-indigo-600 text-white shadow-indigo-100'
                : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
            }`}
          >
            Day {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
