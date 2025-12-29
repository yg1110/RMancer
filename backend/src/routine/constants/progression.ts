/**
 * (선택) 4주 진행(Progression) 상수 — 동일 루틴을 weeks 동안 굴릴 때 week별로 pct/RIR을 조정하는 규칙
 * - MVP에서는 저장 없이 프론트 표시/백엔드 계산에만 사용해도 충분
 */
export type WeekProgression = {
  week: 1 | 2 | 3 | 4;
  pctDelta: number; // +0.00, +0.02 ...
  rirDelta: number; // -0, -1 ...
  volumeMultiplier: number; // 1.0, 0.7 ...
};

export const DEFAULT_4W_PROGRESSION: readonly WeekProgression[] = [
  { week: 1, pctDelta: 0.0, rirDelta: 0, volumeMultiplier: 1.0 },
  { week: 2, pctDelta: 0.01, rirDelta: -1, volumeMultiplier: 1.0 },
  { week: 3, pctDelta: 0.02, rirDelta: -1, volumeMultiplier: 1.0 },
  { week: 4, pctDelta: -0.03, rirDelta: +2, volumeMultiplier: 0.7 }, // deload
] as const;
