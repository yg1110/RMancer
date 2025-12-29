'use client';

import {
  Flame,
  CheckCircle2,
  ChevronRight,
  BicepsFlexed,
  Calendar,
  Sprout,
  Activity,
  Trophy,
} from 'lucide-react';
import { GoalTypeData, ExperienceLevelData } from '@/types/dashboard';
import {
  ExperienceLevel,
  ExperienceLevelDescription,
  ExperienceLevelLabel,
  GoalTypeLabel,
} from '@/shared/enums/dashboard.enum';

interface Step1Props {
  prefs: {
    goal: GoalTypeData;
    experience: ExperienceLevelData;
    weeklyFrequency: number;
  };
  setPrefs: React.Dispatch<
    React.SetStateAction<{
      goal: GoalTypeData;
      experience: ExperienceLevelData;
      weeklyFrequency: number;
    }>
  >;
  onNext: () => void;
}

const getExperienceIcon = (level: ExperienceLevel) => {
  switch (level) {
    case 'BEGINNER':
      return <Sprout className="w-6 h-6" />;
    case 'INTERMEDIATE':
      return <Activity className="w-6 h-6" />;
    case 'ADVANCED':
      return <Trophy className="w-6 h-6" />;
  }
};

export default function Step1({ prefs, setPrefs, onNext }: Step1Props) {
  return (
    <div className="animate-in slide-in-from-right-4 fade-in duration-300 space-y-6">
      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          운동 목표를 선택하세요
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {(['MUSCLE_GAIN', 'FAT_LOSS'] as GoalTypeData[]).map(g => (
            <button
              key={g}
              onClick={() => setPrefs(p => ({ ...p, goal: g }))}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${prefs.goal === g ? 'border-indigo-600 bg-indigo-50 shadow-inner' : 'border-slate-100 bg-white opacity-60'}`}
            >
              {g === 'MUSCLE_GAIN' ? (
                <BicepsFlexed
                  className={`w-8 h-8 ${prefs.goal === g ? 'text-indigo-600' : 'text-slate-400'}`}
                />
              ) : (
                <Flame
                  className={`w-8 h-8 ${prefs.goal === g ? 'text-indigo-600' : 'text-slate-400'}`}
                />
              )}
              <span className="font-bold text-sm">{GoalTypeLabel[g]}</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-800">주당 운동 횟수</h3>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[3, 4, 5, 6].map(freq => (
            <button
              key={freq}
              onClick={() => setPrefs(p => ({ ...p, weeklyFrequency: freq }))}
              className={`py-4 rounded-2xl border-2 font-bold transition-all ${prefs.weeklyFrequency === freq ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg' : 'border-slate-100 bg-white text-slate-400 hover:bg-slate-50'}`}
            >
              {freq}일
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          운동 경력은 어느 정도인가요?
        </h3>
        <div className="space-y-3">
          {(
            ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as ExperienceLevelData[]
          ).map(l => (
            <button
              key={l}
              onClick={() => setPrefs(p => ({ ...p, experience: l }))}
              className={`w-full p-5 rounded-[2rem] border-2 transition-all flex items-center gap-5 px-6 ${prefs.experience === l ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-white opacity-60'}`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${prefs.experience === l ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}
              >
                {getExperienceIcon(l)}
              </div>
              <div className="flex-1 text-left">
                <p
                  className={`font-bold ${prefs.experience === l ? 'text-slate-900' : 'text-slate-600'}`}
                >
                  {ExperienceLevelLabel[l]}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  {ExperienceLevelDescription[l]}
                </p>
              </div>
              {prefs.experience === l && (
                <CheckCircle2 className="w-5 h-5 text-indigo-600" />
              )}
            </button>
          ))}
        </div>
      </section>

      <button
        onClick={onNext}
        className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 mt-6 flex items-center justify-center gap-2"
      >
        다음 단계 <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
