'use client';

import {
  DashboardResponseDto,
  RoutineSubExerciseResponseDto,
} from '@/generated/openapi-client';
import { BodyPartLabel, BodyPartType } from '@/shared/enums/routine.enum';
import { getOneRmByBodyPart } from '@/shared/utils/muscle-label';
import { Check } from 'lucide-react';

type ExerciseCardProps = {
  exercise: RoutineSubExerciseResponseDto;
  exerciseIndex: number;
  dashboardData: DashboardResponseDto | null;
  isWorkingOut: boolean;
  completedSets: boolean[];
  onToggleSet: (setIdx: number) => void;
};

export function ExerciseCard({
  exercise,
  exerciseIndex,
  dashboardData,
  isWorkingOut,
  completedSets,
  onToggleSet,
}: ExerciseCardProps) {
  const isAllDone = completedSets.length > 0 && completedSets.every(s => s);

  return (
    <div
      className={`bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden ${
        isAllDone ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-100'
      }`}
    >
      <div className="p-5 flex gap-4">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border ${
            isAllDone
              ? 'bg-emerald-100 border-emerald-200'
              : 'bg-slate-50 border-slate-100'
          }`}
        >
          {isAllDone ? (
            <Check className="w-8 h-8 text-emerald-500" />
          ) : (
            <img
              src={`https://api.dicebear.com/9.x/shapes/svg?seed=${exercise.id}`}
              className="w-10 h-10 opacity-40"
              alt=""
            />
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[9px] font-black text-indigo-300 uppercase tracking-tighter">
                SEQ {exerciseIndex + 1}
              </span>
              <h5
                className={`text-base font-bold leading-tight ${
                  isAllDone ? 'text-emerald-700' : 'text-slate-800'
                }`}
              >
                {exercise.exerciseName || exercise.chooseOneExercises}
              </h5>
            </div>
            {!exercise.chooseOneExercises && (
              <span className="text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
                {BodyPartLabel[
                  exercise.bodyPart as keyof typeof BodyPartLabel
                ] || ''}
              </span>
            )}
          </div>
          {isWorkingOut && (
            <div className="flex flex-wrap gap-2 mt-3">
              {completedSets.map((done, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => onToggleSet(sIdx)}
                  className={`w-10 h-10 rounded-xl border-2 font-black text-xs transition-all ${
                    done
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-md'
                      : 'bg-white border-slate-100 text-slate-300 hover:border-indigo-200'
                  }`}
                >
                  {sIdx + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        className={`px-6 py-4 border-t ${
          isAllDone
            ? 'border-emerald-100 bg-emerald-50/10'
            : 'border-slate-50 bg-slate-50/30'
        }`}
      >
        <div className="flex justify-between items-end">
          {dashboardData?.latestOneRm && (
            <div>
              {!exercise.chooseOneExercises && (
                <>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">
                    Target
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-slate-900">
                      {getOneRmByBodyPart(
                        exercise.bodyPart as BodyPartType,
                        dashboardData.latestOneRm,
                      )}
                    </span>
                    <span className="text-xs font-bold text-slate-400">kg</span>
                  </div>
                </>
              )}
            </div>
          )}
          <div className="text-right">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">
              Volume
            </p>
            <div className="flex items-baseline gap-1 justify-end">
              <span className="text-xl font-black text-slate-900">
                {exercise.reps}
              </span>
              <span className="text-xs font-bold text-slate-400">reps</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
