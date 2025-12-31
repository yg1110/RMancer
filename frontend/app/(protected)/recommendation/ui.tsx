'use client';

import {
  DashboardResponseDto,
  RoutineResponseDto,
} from '@/generated/openapi-client';
import { OneRmLift } from '@/shared/enums/dashboard.enum';
import { getMuscleLabelByMovement } from '@/shared/utils/muscle-label';
import { calcPctWeightRange, formatRange } from '@/shared/utils/weight';
import {
  ChevronRight,
  Coffee,
  Info,
  Target,
  Zap,
  Activity,
  Settings2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type RecommendationUIProps = {
  dashboardData: DashboardResponseDto | null;
  latestRoutine: RoutineResponseDto | null;
};

export default function RecommendationUI({
  dashboardData,
  latestRoutine,
}: RecommendationUIProps) {
  const router = useRouter();
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);

  const currentDay = latestRoutine?.days[selectedDayIdx];
  const routineTitle = latestRoutine?.title || '추천 루틴';

  return (
    <div className="space-y-6 pb-24">
      <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
        <div
          className={`w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center transition-colors`}
        >
          <Zap className={`w-6 h-6 text-indigo-600`} />
        </div>
        <div>
          <h2
            className={`text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-0.5`}
          >
            맞춤 운동 프로그램
          </h2>
          <p className="text-lg font-black text-slate-800 tracking-tight">
            {routineTitle}
          </p>
        </div>
      </div>

      <div className="backdrop-blur-md py-4 -mx-6 px-6 border-b border-slate-100">
        <div className="flex flex-wrap gap-2 pb-1 scrollbar-hide">
          {latestRoutine?.days.map((day, idx) => (
            <button
              key={day.id}
              onClick={() => setSelectedDayIdx(idx)}
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

      {currentDay && (
        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-800 uppercase">
                {currentDay.name}
              </h3>
            </div>
            <div className="flex gap-1">
              <span className="text-[10px] font-bold text-slate-400 px-2 py-1 bg-slate-50 rounded-lg">
                총 {currentDay.exercises.length}개 동작
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {currentDay.exercises.map((ex, eIdx) => {
              const oneRm =
                dashboardData?.latestOneRm?.[ex.anchorLift as OneRmLift] || 0;

              const isPercent = ex.loadMethod === 'PERCENT_1RM';

              const range = isPercent
                ? calcPctWeightRange({
                    oneRmKg: oneRm,
                    pctMin: ex.pctMin,
                    pctMax: ex.pctMax,
                  })
                : null;

              const weightLabel = formatRange(range);
              return (
                <div
                  key={ex.id}
                  className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:border-indigo-100 transition-colors duration-300"
                >
                  <div className="flex p-5 gap-4">
                    <div className="w-20 h-20 bg-slate-50 rounded-2xl shrink-0 flex items-center justify-center overflow-hidden border border-slate-100">
                      {/* TODO: 운동 이미지 추가 */}
                      <img
                        src={`https://api.dicebear.com/9.x/shapes/svg?seed=${ex.exerciseKey}&backgroundColor=f8fafc`}
                        alt={ex.displayName}
                        className="w-12 h-12 opacity-50"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black text-indigo-300 uppercase tracking-tighter mb-0.5">
                            SEQUENCE {eIdx + 1}
                          </span>
                          <h5 className="text-base font-bold text-slate-800 leading-tight">
                            {ex.displayName}
                          </h5>
                        </div>
                        <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-xl">
                          {
                            getMuscleLabelByMovement({
                              anchorLift: ex.anchorLift as OneRmLift,
                              exerciseKey: ex.exerciseKey,
                            }).label
                          }
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex gap-1">
                          {Array.from({ length: ex.sets }).map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-2 rounded-full bg-indigo-500"
                            />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-slate-500">
                          {ex.sets} SETS
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">
                          Target Weight
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black text-slate-900 tracking-tight">
                            {weightLabel}
                          </span>
                          <span className="text-xs font-bold text-slate-400">
                            {isPercent ? 'kg' : ''}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">
                          Reps per Set
                        </span>
                        <div className="flex items-baseline justify-end gap-1">
                          <span className="text-2xl font-black text-slate-900 tracking-tight">
                            {ex.repsMin}-{ex.repsMax}
                          </span>
                          <span className="text-xs font-bold text-slate-400">
                            회
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Target className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-[11px] font-bold text-slate-400">
                            목표 강도
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-emerald-600">
                          {ex.rirMin}~{ex.rirMax}개 더 남기는 강도
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Coffee className="w-3.5 h-3.5 text-amber-500" />
                          <span className="text-[11px] font-bold text-slate-400">
                            세트 간 휴식
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-amber-600">
                          {ex.restSec}초
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="px-2 space-y-5">
        <div className="bg-indigo-50/30 p-5 rounded-3xl flex gap-3 border border-indigo-50">
          <Info className="w-4 h-4 text-indigo-300 shrink-0 mt-1" />
          <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
            모든 중량은 당신의 1RM 데이터를 기반으로 산출되었습니다.
            <br />
            당일 컨디션이 좋지 않다면 중량을 5% 가량 낮추고, 동작의 정확도에
            집중하세요.
          </p>
        </div>

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
      </div>
    </div>
  );
}
