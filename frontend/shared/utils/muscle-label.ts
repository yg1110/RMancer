import { BodyPartCode, BodyPartType } from '../enums/routine.enum';
import { OneRmAllResponseDto } from '@/generated/openapi-client';
export const getOneRmByBodyPart = (
  bodyPart: BodyPartType,
  oneRm: OneRmAllResponseDto | null,
) => {
  if (!oneRm) return 0;
  switch (bodyPart) {
    case BodyPartCode.CHEST:
      return oneRm.BENCH_PRESS;
    case BodyPartCode.BACK:
      return oneRm.DEADLIFT;
    case BodyPartCode.LEGS:
      return oneRm.BACK_SQUAT;
    case BodyPartCode.SHOULDERS:
      return oneRm.OVERHEAD_PRESS;
    case BodyPartCode.ARMS:
      return oneRm.BENCH_PRESS;
  }
  return 0;
};

// 2.5kg 단위로 반올림
export const toFixedWeightFormat = (oneRmWeight: number, oneRmPct: number) => {
  const weight = oneRmWeight * oneRmPct;
  const rounded = Math.round(weight / 2.5) * 2.5;
  return Number(rounded.toFixed(1));
};
