import { Injectable, BadRequestException } from '@nestjs/common';
import { ExperienceLevel, GoalType, OneRmLift } from '@prisma/client';
import {
  EXERCISES,
  PRESCRIPTIONS,
  SPLIT_TEMPLATES,
  type SlotType,
  type SlotTemplate,
} from '../constants';
import type { OneRmMap } from './one-rm.util';

const LEVEL_ORDER: Record<ExperienceLevel, number> = {
  BEGINNER: 0,
  INTERMEDIATE: 1,
  ADVANCED: 2,
};

function isAllowedLevel(userLevel: ExperienceLevel, minLevel: ExperienceLevel) {
  return LEVEL_ORDER[userLevel] >= LEVEL_ORDER[minLevel];
}

/**
 * CreateRoutineDto 형태를 직접 import해도 되지만,
 * 엔진을 순수하게 유지하고 싶으면 로컬 타입으로 맞춰도 됩니다.
 * 아래는 RoutineService.create가 기대하는 구조에 맞춘 최소 형태입니다.
 */
export type CreateRoutineExerciseInput = {
  order: number;
  exerciseKey: string;
  displayName: string;
  sets: number;
  repsMin: number;
  repsMax: number;
  restSec: number;
  rirMin: number;
  rirMax: number;

  // PERCENT_1RM only
  anchorLift: OneRmLift;
  pctMin: number;
  pctMax: number;

  memo?: string | null;
};

export type CreateRoutineDayInput = {
  dayIndex: number;
  name: string;
  exercises: CreateRoutineExerciseInput[];
};

export type CreateRoutineInput = {
  title: string;
  goalType: GoalType;
  experienceLevel: ExperienceLevel;
  weeklyFrequency: number;
  planWeeks: number;
  sourceVersion: string;
  days: CreateRoutineDayInput[];
};

type GenerateArgs = {
  title: string;
  goalType: GoalType;
  experienceLevel: ExperienceLevel;
  weeklyFrequency: 3 | 4 | 5 | 6;
  planWeeks: number;
  sourceVersion: string;
  oneRmMap: OneRmMap;

  /**
   * MVP에서는 랜덤 없이 고정 선택(항상 같은 추천)으로 시작하는 편이 디버깅이 쉽습니다.
   * 나중에 true로 바꾸면 후보군 중 랜덤 선택.
   */
  randomizeExercisePick?: boolean;
};

@Injectable()
export class RoutineEngine {
  generate(args: GenerateArgs): CreateRoutineInput {
    const templates = SPLIT_TEMPLATES[args.weeklyFrequency];
    if (!templates?.length) {
      throw new BadRequestException('지원하지 않는 주당 빈도입니다.');
    }

    // 1RM 존재 확인 (PERCENT_1RM only 정책)
    this.assertOneRmMap(args.oneRmMap);

    const days: CreateRoutineDayInput[] = templates.map((dayTpl, dayIndex) => {
      const exercises = dayTpl.slots.map((slot, i) =>
        this.buildExerciseFromSlot({
          slot,
          order: i + 1,
          goalType: args.goalType,
          experienceLevel: args.experienceLevel,
          randomize: args.randomizeExercisePick ?? false,
        }),
      );

      return {
        dayIndex,
        name: dayTpl.name,
        exercises,
      };
    });

    return {
      title: args.title,
      goalType: args.goalType,
      experienceLevel: args.experienceLevel,
      weeklyFrequency: args.weeklyFrequency,
      planWeeks: args.planWeeks,
      sourceVersion: args.sourceVersion,
      days,
    };
  }

  private buildExerciseFromSlot(params: {
    slot: SlotTemplate;
    order: number;
    goalType: GoalType;
    experienceLevel: ExperienceLevel;
    randomize: boolean;
  }): CreateRoutineExerciseInput {
    const { slot, order, goalType, experienceLevel, randomize } = params;

    const pres =
      PRESCRIPTIONS[goalType]?.[experienceLevel]?.[slot.slotType as SlotType];
    if (!pres) {
      throw new BadRequestException(
        `처방 테이블이 없습니다: goal=${goalType}, level=${experienceLevel}, slot=${slot.slotType}`,
      );
    }

    const picked = this.pickExercise({
      slot,
      experienceLevel,
      randomize,
    });

    return {
      order,
      exerciseKey: picked.key,
      displayName: picked.name,
      sets: pres.sets,
      repsMin: pres.repsMin,
      repsMax: pres.repsMax,
      restSec: pres.restSec,
      rirMin: pres.rirMin,
      rirMax: pres.rirMax,

      anchorLift: slot.anchorLift,
      pctMin: pres.pctMin,
      pctMax: pres.pctMax,

      memo: null,
    };
  }

  private pickExercise(params: {
    slot: SlotTemplate;
    experienceLevel: ExperienceLevel;
    randomize: boolean;
  }): { key: string; name: string } {
    const { slot, experienceLevel, randomize } = params;

    // 1) pickKeys가 있으면 우선
    if (slot.pickKeys?.length) {
      const found = slot.pickKeys
        .map(k => EXERCISES.find(e => e.key === k))
        .find(Boolean);

      if (found) return { key: found.key, name: found.name };
      // pickKeys가 있는데 못 찾으면 fallback으로 진행
    }

    // 2) anchorLift + pattern + level 로 후보 필터
    const candidates = EXERCISES.filter(e => {
      return (
        e.anchorLift === slot.anchorLift &&
        e.pattern === slot.pattern &&
        isAllowedLevel(experienceLevel, e.minLevel)
      );
    });

    if (!candidates.length) {
      // 3) 단계적 완화 fallback (pattern만 유지)
      const relaxed = EXERCISES.filter(e => {
        return (
          e.pattern === slot.pattern &&
          isAllowedLevel(experienceLevel, e.minLevel)
        );
      });

      if (!relaxed.length) {
        throw new BadRequestException(
          `운동 후보가 없습니다: anchor=${slot.anchorLift}, pattern=${slot.pattern}, level=${experienceLevel}`,
        );
      }

      const chosen = randomize
        ? relaxed[Math.floor(Math.random() * relaxed.length)]
        : relaxed[0];

      return { key: chosen.key, name: chosen.name };
    }

    const chosen = randomize
      ? candidates[Math.floor(Math.random() * candidates.length)]
      : candidates[0];

    return { key: chosen.key, name: chosen.name };
  }

  private assertOneRmMap(oneRmMap: OneRmMap): void {
    const required: OneRmLift[] = [
      OneRmLift.BACK_SQUAT,
      OneRmLift.BENCH_PRESS,
      OneRmLift.DEADLIFT,
      OneRmLift.OVERHEAD_PRESS,
    ];

    const missing = required.filter(
      l => typeof oneRmMap[l] !== 'number' || Number.isNaN(oneRmMap[l]),
    );
    if (missing.length) {
      throw new BadRequestException(
        `1RM 데이터가 부족합니다: ${missing.join(', ')}`,
      );
    }
  }
}
