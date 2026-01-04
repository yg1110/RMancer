import {
  BodyPartCode,
  BodyPartType,
  OneRmLiftCode,
} from '../enums/routine.enum';
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

export const getOneRmLiftName = (exerciseName: string) => {
  switch (exerciseName) {
    case '벤치프레스':
      return OneRmLiftCode.BENCH_PRESS;
    case '스쿼트':
      return OneRmLiftCode.BACK_SQUAT;
    case '데드리프트':
      return OneRmLiftCode.DEADLIFT;
    case '오버헤드 프레스':
      return OneRmLiftCode.OVERHEAD_PRESS;
    default:
      return null;
  }
};
