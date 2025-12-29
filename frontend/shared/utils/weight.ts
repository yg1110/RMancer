import { OneRmRecordResponseDto } from '@/generated/openapi-client';

/** 2.5kg 단위 라운딩 (필요하면 1.25 지원도 추가 가능) */
export function roundToPlate(kg: number, step = 2.5): number {
  if (!Number.isFinite(kg)) return 0;
  return Math.round(kg / step) * step;
}

/** lift별 최신 1RM map 만들기 (measuredAt 기준) */
export function buildLatestOneRmMap(
  oneRms: OneRmRecordResponseDto[] | undefined,
) {
  const map = new Map<
    OneRmRecordResponseDto['lift'],
    { kg: number; measuredAt: string }
  >();

  for (const r of oneRms ?? []) {
    const prev = map.get(r.lift);
    if (
      !prev ||
      new Date(r.measuredAt).getTime() > new Date(prev.measuredAt).getTime()
    ) {
      map.set(r.lift, { kg: r.oneRmKg, measuredAt: r.measuredAt });
    }
  }

  return map;
}

export function calcPctWeightRange(opts: {
  oneRmKg: number;
  pctMin: number;
  pctMax: number;
  step?: number;
}) {
  const { oneRmKg, pctMin, pctMax, step = 2.5 } = opts;

  if (!Number.isFinite(oneRmKg) || oneRmKg <= 0) {
    return null;
  }

  const rawMin = oneRmKg * pctMin;
  const rawMax = oneRmKg * pctMax;

  const minKg = roundToPlate(rawMin, step);
  const maxKg = roundToPlate(rawMax, step);

  return { minKg, maxKg };
}

/** 표시 문자열: "62.5–70kg" */
export function formatRange(range: { minKg: number; maxKg: number } | null) {
  if (!range) return '-';
  if (range.minKg === range.maxKg) return `${range.minKg}`;
  return `${range.minKg}-${range.maxKg}`;
}
