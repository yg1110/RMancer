import { BadRequestException } from '@nestjs/common';
import { OneRmLift, OneRmRecord } from '@prisma/client';

export type OneRmMap = Record<OneRmLift, number>;
const REQUIRED_LIFTS: OneRmLift[] = [
  OneRmLift.BACK_SQUAT,
  OneRmLift.BENCH_PRESS,
  OneRmLift.DEADLIFT,
  OneRmLift.OVERHEAD_PRESS,
];

/**
 * lift별 최신 1RM을 map으로 만들되,
 * 없으면 fallback(기본 0)으로 채웁니다.
 */
export function buildLatestOneRmMapWithFallback(
  records: OneRmRecord[],
  fallback = 0,
): { oneRmMap: OneRmMap; missing: OneRmLift[] } {
  // 기본값으로 map 초기화
  const oneRmMap = Object.fromEntries(
    REQUIRED_LIFTS.map(lift => [lift, fallback]),
  ) as OneRmMap;

  // lift별 최신값만 반영
  const latest = new Map<OneRmLift, { oneRmKg: number; measuredAt: Date }>();

  for (const r of records) {
    const prev = latest.get(r.lift);
    if (!prev || r.measuredAt > prev.measuredAt) {
      latest.set(r.lift, { oneRmKg: r.oneRmKg, measuredAt: r.measuredAt });
    }
  }

  for (const lift of REQUIRED_LIFTS) {
    const v = latest.get(lift);
    if (v && Number.isFinite(v.oneRmKg) && v.oneRmKg > 0) {
      oneRmMap[lift] = v.oneRmKg;
    }
  }

  const missing = REQUIRED_LIFTS.filter(lift => oneRmMap[lift] <= 0);
  return { oneRmMap, missing };
}

/** 2.5kg 단위 라운딩(표시용) */
export function roundToNearest2_5kg(value: number): number {
  return Math.round(value / 2.5) * 2.5;
}

/** (선택) 특정 % 범위에 대한 예상 중량 범위 계산(표시용) */
export function calcTargetWeightRangeKg(
  oneRmKg: number,
  pctMin: number,
  pctMax: number,
): { minKg: number; maxKg: number } {
  return {
    minKg: roundToNearest2_5kg(oneRmKg * pctMin),
    maxKg: roundToNearest2_5kg(oneRmKg * pctMax),
  };
}
