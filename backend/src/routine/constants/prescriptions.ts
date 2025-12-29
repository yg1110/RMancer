import { ExperienceLevel, GoalType } from '@prisma/client';
import { SlotType } from './exercises';

/**
 * 처방(세트/반복/RIR/휴식/%범위) 테이블
 * - pct는 0~1
 * - FAT_LOSS는 볼륨(sets)을 줄이고, 강도(pct 하한)를 소폭 올리는 방향
 */
export type Prescription = {
  sets: number;
  repsMin: number;
  repsMax: number;
  rirMin: number;
  rirMax: number;
  restSec: number;
  pctMin: number;
  pctMax: number;
};

export type PrescriptionTable = Record<
  GoalType,
  Record<ExperienceLevel, Record<SlotType, Prescription>>
>;

export const PRESCRIPTIONS: PrescriptionTable = {
  MUSCLE_GAIN: {
    BEGINNER: {
      MAIN: {
        sets: 3,
        repsMin: 6,
        repsMax: 10,
        rirMin: 2,
        rirMax: 3,
        restSec: 180,
        pctMin: 0.65,
        pctMax: 0.75,
      },
      ASSIST: {
        sets: 3,
        repsMin: 8,
        repsMax: 12,
        rirMin: 2,
        rirMax: 4,
        restSec: 120,
        pctMin: 0.55,
        pctMax: 0.7,
      },
      ACC: {
        sets: 2,
        repsMin: 10,
        repsMax: 15,
        rirMin: 2,
        rirMax: 4,
        restSec: 90,
        pctMin: 0.45,
        pctMax: 0.6,
      },
    },
    INTERMEDIATE: {
      MAIN: {
        sets: 4,
        repsMin: 5,
        repsMax: 10,
        rirMin: 1,
        rirMax: 3,
        restSec: 210,
        pctMin: 0.67,
        pctMax: 0.8,
      },
      ASSIST: {
        sets: 3,
        repsMin: 6,
        repsMax: 12,
        rirMin: 1,
        rirMax: 3,
        restSec: 150,
        pctMin: 0.6,
        pctMax: 0.75,
      },
      ACC: {
        sets: 3,
        repsMin: 10,
        repsMax: 15,
        rirMin: 1,
        rirMax: 3,
        restSec: 105,
        pctMin: 0.5,
        pctMax: 0.65,
      },
    },
    ADVANCED: {
      MAIN: {
        sets: 5,
        repsMin: 3,
        repsMax: 8,
        rirMin: 1,
        rirMax: 2,
        restSec: 240,
        pctMin: 0.7,
        pctMax: 0.85,
      },
      ASSIST: {
        sets: 4,
        repsMin: 5,
        repsMax: 10,
        rirMin: 1,
        rirMax: 2,
        restSec: 180,
        pctMin: 0.65,
        pctMax: 0.8,
      },
      ACC: {
        sets: 3,
        repsMin: 8,
        repsMax: 15,
        rirMin: 1,
        rirMax: 3,
        restSec: 120,
        pctMin: 0.55,
        pctMax: 0.7,
      },
    },
  },
  FAT_LOSS: {
    BEGINNER: {
      MAIN: {
        sets: 3,
        repsMin: 4,
        repsMax: 8,
        rirMin: 2,
        rirMax: 3,
        restSec: 180,
        pctMin: 0.7,
        pctMax: 0.8,
      },
      ASSIST: {
        sets: 2,
        repsMin: 6,
        repsMax: 10,
        rirMin: 2,
        rirMax: 4,
        restSec: 120,
        pctMin: 0.6,
        pctMax: 0.72,
      },
      ACC: {
        sets: 2,
        repsMin: 8,
        repsMax: 12,
        rirMin: 2,
        rirMax: 4,
        restSec: 90,
        pctMin: 0.5,
        pctMax: 0.62,
      },
    },
    INTERMEDIATE: {
      MAIN: {
        sets: 4,
        repsMin: 3,
        repsMax: 6,
        rirMin: 1,
        rirMax: 3,
        restSec: 210,
        pctMin: 0.75,
        pctMax: 0.85,
      },
      ASSIST: {
        sets: 3,
        repsMin: 5,
        repsMax: 8,
        rirMin: 1,
        rirMax: 3,
        restSec: 150,
        pctMin: 0.65,
        pctMax: 0.78,
      },
      ACC: {
        sets: 2,
        repsMin: 8,
        repsMax: 12,
        rirMin: 1,
        rirMax: 3,
        restSec: 105,
        pctMin: 0.55,
        pctMax: 0.68,
      },
    },
    ADVANCED: {
      MAIN: {
        sets: 4,
        repsMin: 2,
        repsMax: 5,
        rirMin: 1,
        rirMax: 2,
        restSec: 240,
        pctMin: 0.8,
        pctMax: 0.88,
      },
      ASSIST: {
        sets: 3,
        repsMin: 4,
        repsMax: 8,
        rirMin: 1,
        rirMax: 2,
        restSec: 180,
        pctMin: 0.7,
        pctMax: 0.82,
      },
      ACC: {
        sets: 2,
        repsMin: 8,
        repsMax: 12,
        rirMin: 1,
        rirMax: 3,
        restSec: 120,
        pctMin: 0.58,
        pctMax: 0.7,
      }, // ACC pctMax 상한 유지
    },
  },
} as const;
