'use client';

import {
  ChevronRight,
  Sparkles,
  Zap,
  Brain,
  Dumbbell,
  Flame,
  Layers,
  Sprout,
  Trophy,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import * as api from '@/lib/api';
import { toErrorMessage } from '@/shared/enums/utils/error';
import { toast } from 'sonner';
import {
  CreateRoutineDto,
  PresetRoutineListItemDto,
} from '@/generated/openapi-client';
import { PresetRoutineType } from '@/shared/enums/routine.enum';

const RoutineIconMap = [
  {
    icon: <Sprout className="w-7 h-7" />,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: <Layers className="w-7 h-7" />,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
  },
  {
    icon: <Trophy className="w-7 h-7" />,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    badge: 'HARD',
  },
  {
    icon: <Dumbbell className="w-7 h-7" />,
    color: 'text-slate-600',
    bgColor: 'bg-slate-100',
  },
  {
    icon: <Flame className="w-7 h-7" />,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
  {
    icon: <Sparkles className="w-7 h-7" />,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
    badge: 'HARD',
  },
];

export default function ProgramSelectionUI({
  presetRoutines,
}: {
  presetRoutines: PresetRoutineListItemDto[];
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const createRecommendedRoutineMutation = useMutation({
    mutationFn: async (presetRoutineType: PresetRoutineType) => {
      const { data, error } =
        await api.createRecommendedRoutine(presetRoutineType);
      if (error) throw error;
      return data;
    },
    onError: error => {
      toast.error(toErrorMessage(error));
    },
  });

  const handleSelect = async (routine: PresetRoutineListItemDto) => {
    setLoading(true);
    const data = await createRecommendedRoutineMutation.mutateAsync(
      routine.type,
    );
    if (data) router.push('/recommendation');
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center  space-y-6 px-4">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain className="w-6 h-6 text-indigo-600 animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-slate-800">
            잠재력을 계산하는 중입니다
          </h3>
          <p className="text-slate-500">
            입력된 목표와 신체 능력 데이터를 바탕으로 당신에게
            <br />
            가장 완벽한 루틴을 설계하고 있습니다...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4">
      <div className="space-y-2 px-2">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
          어떤 프로그램을 원하시나요?
        </h2>
        <p className="text-slate-500 text-sm">
          분석된 데이터를 바탕으로 최적의 옵션을 제안합니다.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3.5">
        {presetRoutines.map((routine, idx) => {
          const { icon, bgColor, color, badge } =
            RoutineIconMap[idx % RoutineIconMap.length];
          return (
            <button
              key={routine.type}
              onClick={() => handleSelect(routine)}
              className="group relative overflow-hidden bg-white p-5 rounded-[2rem] border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-100 transition-all text-left flex items-center gap-4"
            >
              <div
                className={`w-14 h-14 ${bgColor} rounded-2xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-300`}
              >
                {icon}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-800">
                    {routine.title}
                  </h3>
                  {badge && (
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-tighter bg-amber-100 text-amber-600`}
                    >
                      {badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 font-medium leading-relaxed">
                  {routine.description}
                </p>
              </div>

              <div className="w-8 h-8 rounded-full bg-slate-50 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all">
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </button>
          );
        })}
      </div>

      <div className="px-6 py-5 bg-slate-50 rounded-3xl border border-slate-100">
        <div className="flex items-start gap-3">
          <Zap className="w-4 h-4 text-indigo-400 shrink-0 mt-1" />
          <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
            선택한 스타일에 따라 AI가 중량 설정 및 운동 종목 구성을 실시간으로
            재조정하여 프로그램을 생성합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
