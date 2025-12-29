'use client';

import { InBodyData } from '@/types/dashboard';

interface Step2Props {
  inBody: InBodyData;
  setInBody: React.Dispatch<React.SetStateAction<InBodyData>>;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2({
  inBody,
  setInBody,
  onNext,
  onBack,
}: Step2Props) {
  const updateInBody = (field: keyof InBodyData, val: string) => {
    setInBody(prev => ({ ...prev, [field]: parseFloat(val) || 0 }));
  };

  return (
    <div className="animate-in slide-in-from-right-4 fade-in duration-300 space-y-4">
      <h3 className="text-lg font-bold text-slate-800">체성분 정보 입력</h3>
      <p className="text-sm text-slate-500">
        최근의 인바디 데이터를 입력해주세요.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: '키 (cm)', field: 'heightCm', value: inBody.heightCm },
          { label: '체중 (kg)', field: 'weightKg', value: inBody.weightKg },
          {
            label: '골격근량 (kg)',
            field: 'skeletalMuscleKg',
            value: inBody.skeletalMuscleKg,
          },
          {
            label: '체지방률 (%)',
            field: 'bodyFatPct',
            value: inBody.bodyFatPct,
          },
        ].map(item => (
          <div
            key={item.field}
            className="p-4 bg-slate-50 rounded-2xl border border-slate-100 focus-within:ring-2 focus-within:ring-indigo-100 transition-all"
          >
            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
              {item.label}
            </label>
            <input
              type="number"
              value={item.value}
              onChange={e =>
                updateInBody(item.field as keyof InBodyData, e.target.value)
              }
              className="w-full bg-transparent text-xl font-bold text-slate-800 outline-none"
            />
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
          onClick={onNext}
          className="py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100"
        >
          다음
        </button>
      </div>
    </div>
  );
}

