'use client';

import {
  CalculateOneRmDto,
  DashboardResponseDto,
  RoutineResponseDto,
} from '@/generated/openapi-client';
import { useState } from 'react';
import { ActionButtons } from './components/action-buttons';
import { DaySelector } from './components/day-selector';
import { GrowthSummary } from './components/growth-summary';
import { InfoBanner } from './components/info-banner';
import { RoutineHeader } from './components/routine-header';
import { WorkoutControlButton } from './components/workout-control-button';
import { ExerciseCard } from './components/exercise-card';
import {
  getOneRmByBodyPart,
  getOneRmLiftName,
  toFixedWeightFormat,
} from '@/shared/utils/muscle-label';
import { useMutation } from '@tanstack/react-query';

import * as api from '@/lib/api';
import { BodyPartType } from '@/shared/enums/routine.enum';
import { toast } from 'sonner';

type RecommendationUIProps = {
  dashboardData: DashboardResponseDto | null;
  latestRoutine: RoutineResponseDto | null;
};

export default function RecommendationUI({
  dashboardData,
  latestRoutine,
}: RecommendationUIProps) {
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [isWorkingOut, setIsWorkingOut] = useState(false);
  const [completedSets, setCompletedSets] = useState<Record<string, boolean[]>>(
    {},
  );
  const [showGrowthSummary, setShowGrowthSummary] = useState(false);
  const [increased, setIncreased] = useState(0);

  const currentDay = latestRoutine?.days?.[selectedDayIdx];
  const routineTitle = latestRoutine?.title || '추천 루틴';

  const calculateAndUpdateOneRmRecordMutation = useMutation({
    mutationFn: async (body: CalculateOneRmDto) => {
      const { data, error } = await api.calculateAndUpdateOneRmRecord(body);
      if (error) throw error;
      return data;
    },
  });

  const finishWorkout = async () => {
    const currentSubExercises = currentDay?.subExercises || [];
    for (const exercise of currentSubExercises) {
      if (!exercise.exerciseName) continue;
      const liftName = getOneRmLiftName(exercise.exerciseName);
      const weightKg = toFixedWeightFormat(
        getOneRmByBodyPart(
          exercise.bodyPart as BodyPartType,
          dashboardData?.latestOneRm || null,
        ),
        exercise.oneRmPct || 0,
      );
      if (!liftName || !weightKg || !exercise.reps) continue;
      const increased = await calculateAndUpdateOneRmRecordMutation.mutateAsync(
        {
          lift: liftName,
          weightKg: weightKg,
          reps: exercise.reps,
        },
      );
      if (!increased) continue;
      setIncreased(+increased);
    }
    setIsWorkingOut(false);
    setShowGrowthSummary(true);
  };

  const startWorkout = () => {
    if (!latestRoutine?.days[selectedDayIdx]) return;
    const initialSets: Record<string, boolean[]> = {};
    latestRoutine.days[selectedDayIdx].subExercises.forEach(ex => {
      initialSets[ex.id] = new Array(ex.sets).fill(false);
    });
    setCompletedSets(initialSets);
    setIsWorkingOut(true);
  };

  const cancelWorkout = () => {
    setIsWorkingOut(false);
    setCompletedSets({});
  };

  const toggleSet = (exId: string, setIdx: number) => {
    setCompletedSets(prev => {
      const newState = [...prev[exId]];
      newState[setIdx] = !newState[setIdx];
      return { ...prev, [exId]: newState };
    });
  };

  const confirmGrowth = () => {
    if (!currentDay) return;
    setShowGrowthSummary(false);
  };

  // 모든 세트가 완료되었는지 확인
  const allSetsCompleted = currentDay
    ? currentDay.subExercises.every(ex => {
        const sets = completedSets[ex.id] || [];
        return sets.length === ex.sets && sets.every(completed => completed);
      })
    : false;

  if (showGrowthSummary) {
    return <GrowthSummary increased={increased} onConfirm={confirmGrowth} />;
  }

  if (!latestRoutine) {
    return null;
  }

  return (
    <div className="space-y-6 pb-16">
      <RoutineHeader title={routineTitle} />

      <DaySelector
        days={latestRoutine.days}
        selectedDayIdx={selectedDayIdx}
        onSelectDay={idx => {
          if (isWorkingOut) {
            toast.info('운동 중에는 운동 일정을 변경할 수 없습니다.');
            return;
          }
          setSelectedDayIdx(idx);
        }}
      />

      {currentDay && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="space-y-4">
            {currentDay.subExercises.map((ex, eIdx) => (
              <ExerciseCard
                key={ex.id}
                exercise={ex}
                exerciseIndex={eIdx}
                dashboardData={dashboardData}
                isWorkingOut={isWorkingOut}
                completedSets={completedSets[ex.id] || []}
                onToggleSet={setIdx => toggleSet(ex.id, setIdx)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="px-2 space-y-5">
        <InfoBanner />
        <ActionButtons />
        <WorkoutControlButton
          isWorkingOut={isWorkingOut}
          onStart={startWorkout}
          onFinish={finishWorkout}
          onCancel={cancelWorkout}
          disabled={isWorkingOut && !allSetsCompleted}
        />
      </div>
    </div>
  );
}
