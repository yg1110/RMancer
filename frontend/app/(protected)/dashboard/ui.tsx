'use client';

import { useEffect, useState } from 'react';
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
import { CreateDashboardProfileDto } from '@/generated/openapi-client';
import { toast } from 'sonner';
import Progress from './components/progress';
import Step1 from './components/step1';
import Step2 from './components/step2';
import Step3 from './components/step3';
import { toErrorMessage } from '@/shared/enums/utils/error';
import { useRouter } from 'next/navigation';
import { Save } from 'lucide-react';

export default function DashboardUI({ isEdit }: { isEdit: boolean }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [prefs, setPrefs] = useState<{
    goal: GoalTypeData;
    experience: ExperienceLevelData;
    weeklyFrequency: number;
  }>({
    goal: GoalTypeCode.MUSCLE_GAIN,
    experience: ExperienceLevelCode.ADVANCED,
    weeklyFrequency: 6,
  });
  const [inBody, setInBody] = useState<InBodyData>({
    heightCm: 170,
    weightKg: 69.1,
    skeletalMuscleKg: 31.5,
    bodyFatKg: 14.3,
    bodyFatPct: 20.7,
  });
  const [oneRM, setOneRM] = useState<OneRMData>({
    squat: 125,
    benchPress: 85,
    deadlift: 130,
    overheadPress: 65,
  });
  const [unknowns, setUnknowns] = useState({
    squat: false,
    benchPress: false,
    deadlift: false,
    overheadPress: false,
  });

  const createDashboardProfileMutation = useMutation({
    mutationFn: async (body: CreateDashboardProfileDto) => {
      const { data } = await api.createDashboardProfile(body);
      return data;
    },
    onError: error => {
      toast.error(toErrorMessage(error));
    },
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    const finalRM: OneRMData = {
      squat: unknowns.squat ? 0 : oneRM.squat,
      benchPress: unknowns.benchPress ? 0 : oneRM.benchPress,
      deadlift: unknowns.deadlift ? 0 : oneRM.deadlift,
      overheadPress: unknowns.overheadPress ? 0 : oneRM.overheadPress,
    };

    try {
      // 트랜잭션을 사용하여 모든 데이터를 안전하게 저장
      await createDashboardProfileMutation.mutateAsync({
        goalProfile: {
          goalType: prefs.goal,
          experienceLevel: prefs.experience,
          weeklyFrequency: prefs.weeklyFrequency,
        },
        inbodyRecord: {
          measuredAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          heightCm: inBody.heightCm,
          weightKg: inBody.weightKg,
          skeletalMuscleKg: inBody.skeletalMuscleKg,
          bodyFatKg: inBody.bodyFatKg,
          bodyFatPct: inBody.bodyFatPct,
        },
        oneRmRecords: [
          {
            lift: 'BENCH_PRESS',
            oneRmKg: finalRM.benchPress,
          },
          {
            lift: 'DEADLIFT',
            oneRmKg: finalRM.deadlift,
          },
          {
            lift: 'OVERHEAD_PRESS',
            oneRmKg: finalRM.overheadPress,
          },
          {
            lift: 'BACK_SQUAT',
            oneRmKg: finalRM.squat,
          },
        ],
      });
      router.push('/selection');
    } catch (error) {
      // 에러는 mutation의 onError에서 처리됨
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Save className="w-6 h-6 text-indigo-600 animate-pulse" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">
            정보 저장 중...
          </h2>
          <p className="text-slate-400 text-sm">
            입력하신 데이터를 기반으로
            <br />
            최적의 루틴을 준비하고 있습니다.
          </p>
        </div>
      </div>
    );
  }

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
