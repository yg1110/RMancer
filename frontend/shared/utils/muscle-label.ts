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
};
