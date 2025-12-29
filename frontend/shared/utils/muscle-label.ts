import { OneRMData } from '@/types/dashboard';

export type MuscleLabel =
  | '가슴'
  | '등'
  | '어깨'
  | '하체'
  | '팔'
  | '코어'
  | '전신';

export type MuscleLabelResult = {
  label: MuscleLabel;
  tone: 'indigo' | 'emerald' | 'amber' | 'slate';
};

export function getMuscleLabelByMovement(opts: {
  anchorLift: 'BENCH_PRESS' | 'OVERHEAD_PRESS' | 'BACK_SQUAT' | 'DEADLIFT';
  exerciseKey: string;
  displayName?: string | null;
}): MuscleLabelResult {
  const key = (opts.exerciseKey ?? '').toLowerCase();

  // 1) exerciseKey 기반 예외 처리 (정밀하게)
  // 팔
  if (
    key.includes('curl') ||
    key.includes('tricep') ||
    key.includes('pushdown') ||
    key.includes('skull')
  ) {
    return { label: '팔', tone: 'amber' };
  }

  // 코어
  if (
    key.includes('plank') ||
    key.includes('crunch') ||
    key.includes('sit_up') ||
    key.includes('russian') ||
    key.includes('leg_raise') ||
    key.includes('hanging')
  ) {
    return { label: '코어', tone: 'slate' };
  }

  // 하체
  if (
    key.includes('squat') ||
    key.includes('leg_press') ||
    key.includes('lunge') ||
    key.includes('split_squat') ||
    key.includes('leg_extension') ||
    key.includes('leg_curl') ||
    key.includes('calf')
  ) {
    return { label: '하체', tone: 'emerald' };
  }

  // 등(당기는 계열)
  if (
    key.includes('row') ||
    key.includes('pulldown') ||
    key.includes('pull_up') ||
    key.includes('chin_up') ||
    key.includes('face_pull') ||
    key.includes('shrug')
  ) {
    return { label: '등', tone: 'indigo' };
  }

  // 가슴(미는 계열)
  if (
    key.includes('bench') ||
    key.includes('fly') ||
    key.includes('crossover') ||
    key.includes('push_up') ||
    key.includes('dip')
  ) {
    return { label: '가슴', tone: 'indigo' };
  }

  switch (opts.anchorLift) {
    case 'BENCH_PRESS':
      return { label: '가슴', tone: 'indigo' };
    case 'OVERHEAD_PRESS':
      return { label: '어깨', tone: 'indigo' };
    case 'BACK_SQUAT':
      return { label: '하체', tone: 'emerald' };
    case 'DEADLIFT':
      return { label: '등', tone: 'indigo' };
    default:
      return { label: '전신', tone: 'slate' };
  }
}
