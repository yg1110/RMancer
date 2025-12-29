'use client';

import {
  ChevronLast,
  GripHorizontal,
  ArrowUp,
  Weight,
  Wand2,
} from 'lucide-react';
import { OneRMData } from '@/types/dashboard';
import {
  SquatIcon,
  BenchIcon,
  DeadliftIcon,
  OverheadPressIcon,
} from '@/shared/icons/lifts';

interface Step3Props {
  oneRM: OneRMData;
  setOneRM: React.Dispatch<React.SetStateAction<OneRMData>>;
  unknowns: {
    squat: boolean;
    benchPress: boolean;
    deadlift: boolean;
    overheadPress: boolean;
  };
  setUnknowns: React.Dispatch<
    React.SetStateAction<{
      squat: boolean;
      benchPress: boolean;
      deadlift: boolean;
      overheadPress: boolean;
    }>
  >;
  onSubmit: () => void;
  onBack: () => void;
}

export default function Step3({
  oneRM,
  setOneRM,
  unknowns,
  setUnknowns,
  onSubmit,
  onBack,
}: Step3Props) {
  const updateOneRM = (field: keyof OneRMData, val: string) => {
    setOneRM(prev => ({ ...prev, [field]: parseFloat(val) || 0 }));
  };

  const toggleUnknown = (field: keyof typeof unknowns) => {
    setUnknowns(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="animate-in slide-in-from-right-4 fade-in duration-300 space-y-4">
      <h3 className="text-lg font-bold text-slate-800">1RM 근력 측정치</h3>
      <p className="text-sm text-slate-500">
        최대 무게를 입력하거나 '모름'을 선택하세요.
      </p>

      <div className="space-y-4">
        {[
          {
            label: '백 스쿼트',
            field: 'squat',
            icon: SquatIcon,
          },
          {
            label: '벤치 프레스',
            field: 'benchPress',
            icon: BenchIcon,
          },
          {
            label: '데드리프트',
            field: 'deadlift',
            icon: DeadliftIcon,
          },
          {
            label: '밀리터리 프레스(OHP)',
            field: 'overheadPress',
            icon: OverheadPressIcon,
          },
        ].map((item, idx) => (
          <div
            key={item.field}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${unknowns[item.field as keyof typeof unknowns] ? 'bg-slate-50 border-slate-100 opacity-80' : `${idx % 2 === 0 ? 'bg-indigo-50 border-indigo-100' : 'bg-blue-50 border-blue-100'}`}`}
          >
            <div
              className={`w-10 h-10 ${idx % 2 === 0 ? 'bg-indigo-600' : 'bg-blue-600'} rounded-xl flex items-center justify-center text-white`}
            >
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <label
                  className={`text-[10px] font-bold uppercase ${unknowns[item.field as keyof typeof unknowns] ? 'text-slate-400' : `${idx % 2 === 0 ? 'text-indigo-400' : 'text-blue-400'}`}`}
                >
                  {item.label}
                </label>
                <button
                  onClick={() =>
                    toggleUnknown(item.field as keyof typeof unknowns)
                  }
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors ${unknowns[item.field as keyof typeof unknowns] ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}
                >
                  모름
                </button>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  disabled={unknowns[item.field as keyof typeof unknowns]}
                  value={oneRM[item.field as keyof OneRMData] || ''}
                  onChange={e =>
                    updateOneRM(item.field as keyof OneRMData, e.target.value)
                  }
                  className={`bg-transparent text-xl font-black outline-none w-full ${unknowns[item.field as keyof typeof unknowns] ? 'text-slate-300' : `${idx % 2 === 0 ? 'text-indigo-900' : 'text-blue-900'}`}`}
                  placeholder={
                    unknowns[item.field as keyof typeof unknowns]
                      ? '측정값 없음'
                      : '0'
                  }
                />
                {!unknowns[item.field as keyof typeof unknowns] && (
                  <span
                    className={`font-bold ${idx % 2 === 0 ? 'text-indigo-400' : 'text-blue-400'}`}
                  >
                    kg
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <button
          onClick={onBack}
          className="py-4 bg-white text-slate-600 border border-slate-200 rounded-xl font-bold"
        >
          이전
        </button>
        <button
          onClick={onSubmit}
          className="py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
        >
          분석 시작 <Wand2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
