'use client';

import { useState } from 'react';
import {
  GoalTypeData,
  ExperienceLevelData,
  InBodyData,
  OneRMData,
} from '@/types/dashboard';
import { format } from 'date-fns';
import { signOut } from 'next-auth/react';
import {
  ExperienceLevelCode,
  GoalTypeCode,
} from '@/shared/enums/dashboard.enum';
import * as api from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import {
  CreateGoalProfileDto,
  CreateInbodyRecordDto,
  CreateOneRmRecordDto,
} from '@/generated/openapi-client';
import { toast } from 'sonner';
import Progress from './components/progress';
import Step1 from './components/step1';
import Step2 from './components/step2';
import Step3 from './components/step3';
import { toErrorMessage } from '@/shared/enums/utils/error';

export default function DashboardUI() {
  const [step, setStep] = useState(1);

  const [prefs, setPrefs] = useState<{
    goal: GoalTypeData;
    experience: ExperienceLevelData;
  }>({
    goal: GoalTypeCode.MUSCLE_GAIN,
    experience: ExperienceLevelCode.BEGINNER,
  });

  const [inBody, setInBody] = useState<InBodyData>({
    heightCm: 175,
    weightKg: 75,
    skeletalMuscleKg: 35,
    bodyFatKg: 18,
    bodyFatPct: 18,
  });

  const [oneRM, setOneRM] = useState<OneRMData>({
    squat: 100,
    benchPress: 80,
    deadlift: 120,
    overheadPress: 50,
  });

  const [unknowns, setUnknowns] = useState({
    squat: false,
    benchPress: false,
    deadlift: false,
    overheadPress: false,
  });

  const createInbodyRecordMutation = useMutation({
    mutationFn: async (body: CreateInbodyRecordDto) => {
      const { data, error } = await api.createInbodyRecord(body);
      console.log('error', error);
      if (error) {
        toast.error(error as string);
      }

      return data;
    },
    onError: error => {
      toast.error(toErrorMessage(error));
    },
  });

  const createGoalProfileMutation = useMutation({
    mutationFn: async (body: CreateGoalProfileDto) => {
      const { data, error } = await api.createGoalProfile(body);
      if (error) throw error;
      return data;
    },
    onError: error => {
      toast.error(toErrorMessage(error));
    },
  });

  const createOneRmRecordMutation = useMutation({
    mutationFn: async (body: CreateOneRmRecordDto) => {
      const { data, error } = await api.createOneRmRecord(body);
      if (error) throw error;
      return data;
    },
    onError: error => {
      toast.error(toErrorMessage(error));
    },
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = () => {
    const finalRM: OneRMData = {
      squat: unknowns.squat ? 0 : oneRM.squat,
      benchPress: unknowns.benchPress ? 0 : oneRM.benchPress,
      deadlift: unknowns.deadlift ? 0 : oneRM.deadlift,
      overheadPress: unknowns.overheadPress ? 0 : oneRM.overheadPress,
    };
    const goalProfile = createGoalProfileMutation.mutate({
      goalType: prefs.goal,
      experienceLevel: prefs.experience,
      weeklyFrequency: 4,
      defaultPlanWeeks: 1,
    });
    // const inbodyRecord = createInbodyRecordMutation.mutate({
    //   measuredAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    //   heightCm: inBody.heightCm,
    //   weightKg: inBody.weightKg,
    //   skeletalMuscleKg: inBody.skeletalMuscleKg,
    //   bodyFatKg: inBody.bodyFatKg,
    //   bodyFatPct: inBody.bodyFatPct,
    // });
    // const benchPress = createOneRmRecordMutation.mutate({
    //   lift: 'BENCH_PRESS',
    //   oneRmKg: finalRM.benchPress,
    // });
    // const deadlift = createOneRmRecordMutation.mutate({
    //   lift: 'DEADLIFT',
    //   oneRmKg: finalRM.deadlift,
    // });
    // const overheadPress = createOneRmRecordMutation.mutate({
    //   lift: 'OVERHEAD_PRESS',
    //   oneRmKg: finalRM.overheadPress,
    // });
    console.log('goalProfile', goalProfile);
    // navigate('/recommendation');
  };

  return (
    <div className="space-y-6">
      <Progress step={step} />

      {step === 1 && (
        <Step1 prefs={prefs} setPrefs={setPrefs} onNext={handleNext} />
      )}

      {step === 2 && (
        <Step2
          inBody={inBody}
          setInBody={setInBody}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}

      {step === 3 && (
        <Step3
          oneRM={oneRM}
          setOneRM={setOneRM}
          unknowns={unknowns}
          setUnknowns={setUnknowns}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
      )}

      <button
        onClick={() => signOut()}
        className="w-full text-slate-400 text-sm font-medium hover:text-red-500 transition-colors mt-8"
      >
        로그아웃
      </button>
    </div>
  );
}
