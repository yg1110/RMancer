'use client';

import { ShieldCheck, ChevronRight, Sparkles, Zap, Brain } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import * as api from '@/lib/api';
import { toErrorMessage } from '@/shared/enums/utils/error';
import { toast } from 'sonner';

export default function ProgramSelectionUI() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const createRecommendedRoutineMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await api.createRecommendedRoutine();
      if (error) throw error;
      return data;
    },
    onError: error => {
      toast.error(toErrorMessage(error));
    },
  });

  const handleSelect = async (program: string) => {
    setLoading(true);
    const data = await createRecommendedRoutineMutation.mutateAsync();
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
          입력된 데이터를 바탕으로 두 가지 경로를 준비했습니다.
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => handleSelect('NORMAL')}
          className="w-full group relative overflow-hidden bg-white p-6 rounded-[2.5rem] border-2 border-slate-100 hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-50 transition-all text-left flex items-center gap-5"
        >
          <div className="w-16 h-16 bg-indigo-50 rounded-3xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
            <ShieldCheck className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-black text-slate-800 group-hover:text-indigo-600 transition-colors">
              1. 추천 루틴 받기
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
              현재 수준에서 가장 안전하고
              <br />
              효율적인 표준 성장을 지향합니다.
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
        </button>

        <button
          onClick={() => handleSelect('GIANT')}
          className="w-full group relative overflow-hidden bg-white p-6 rounded-[2.5rem] border-2 border-slate-100 hover:border-amber-500 hover:shadow-xl hover:shadow-amber-50 transition-all text-left flex items-center gap-5"
        >
          <div className="w-16 h-16 bg-amber-50 rounded-3xl flex items-center justify-center group-hover:bg-amber-500 transition-colors">
            <Sparkles className="w-8 h-8 text-amber-500 group-hover:text-white transition-colors" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-800 group-hover:text-amber-600 transition-colors">
                2. 거인화 프로젝트
              </h3>
              <span className="bg-amber-100 text-amber-600 text-[10px] px-2 py-0.5 rounded-lg font-black uppercase tracking-tighter">
                Hard
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
              근비대와 파워를 극한까지 끌어올리는
              <br />
              고강도 볼륨 중심의 벌크업 프로그램입니다.
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
        </button>
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
