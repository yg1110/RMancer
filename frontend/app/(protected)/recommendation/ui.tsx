'use client';

import {
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

  const currentDay = latestRoutine?.days?.[selectedDayIdx];
  const routineTitle = latestRoutine?.title || '추천 루틴';

  const finishWorkout = () => {
    setIsWorkingOut(false);
    setShowGrowthSummary(true);
  };

  const startWorkout = () => {
    if (!latestRoutine?.days[selectedDayIdx]) return;
    const initialSets: Record<string, boolean[]> = {};
    // latestRoutine.days[selectedDayIdx].exercises.forEach(ex => {
    //   initialSets[ex.id] = new Array(ex.sets).fill(false);
    // });
    setCompletedSets(initialSets);
    setIsWorkingOut(true);
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

  if (showGrowthSummary) {
    return <GrowthSummary onConfirm={confirmGrowth} />;
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
        onSelectDay={setSelectedDayIdx}
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
        />
      </div>
    </div>
  );
}
