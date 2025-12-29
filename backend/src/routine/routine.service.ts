import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { RoutineResponseDto } from './dto/routine-response.dto';
import { CreateRoutineLogDto } from './dto/create-routine-log.dto';
import { RoutineLogResponseDto } from './dto/routine-log-response.dto';
import { ROUTINE_ERROR_MESSAGE } from './routine.constants';
import { RoutineEngine } from './engine/routine-engine';
import { ExperienceLevel, GoalType, OneRmLift } from '@prisma/client';
import { buildLatestOneRmMapWithFallback } from './engine/one-rm.util';

@Injectable()
export class RoutineService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly routineEngine: RoutineEngine,
  ) {}

  async create(
    userId: string,
    createDto: CreateRoutineDto,
  ): Promise<RoutineResponseDto> {
    const routine = await this.prisma.routine.create({
      data: {
        userId,
        title: createDto.title,
        goalType: createDto.goalType,
        experienceLevel: createDto.experienceLevel,
        weeklyFrequency: createDto.weeklyFrequency,
        planWeeks: createDto.planWeeks,
        sourceVersion: createDto.sourceVersion,
        days: {
          create: createDto.days.map(day => ({
            dayIndex: day.dayIndex,
            name: day.name,
            exercises: {
              create: day.exercises.map(exercise => ({
                order: exercise.order,
                exerciseKey: exercise.exerciseKey,
                displayName: exercise.displayName,
                sets: exercise.sets,
                repsMin: exercise.repsMin,
                repsMax: exercise.repsMax,
                restSec: exercise.restSec,
                rirMin: exercise.rirMin,
                rirMax: exercise.rirMax,
                anchorLift: exercise.anchorLift,
                pctMin: exercise.pctMin,
                pctMax: exercise.pctMax,
                memo: exercise.memo,
              })),
            },
          })),
        },
      },
      include: {
        days: {
          include: {
            exercises: {
              orderBy: {
                order: 'asc',
              },
            },
          },
          orderBy: {
            dayIndex: 'asc',
          },
        },
      },
    });

    return routine;
  }

  async findAll(userId: string): Promise<RoutineResponseDto[]> {
    const routines = await this.prisma.routine.findMany({
      where: {
        userId,
      },
      include: {
        days: {
          include: {
            exercises: {
              orderBy: {
                order: 'asc',
              },
            },
          },
          orderBy: {
            dayIndex: 'asc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return routines;
  }

  async findOne(id: string, userId: string): Promise<RoutineResponseDto> {
    const routine = await this.prisma.routine.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        days: {
          include: {
            exercises: {
              orderBy: {
                order: 'asc',
              },
            },
          },
          orderBy: {
            dayIndex: 'asc',
          },
        },
      },
    });

    if (!routine) {
      throw new NotFoundException(ROUTINE_ERROR_MESSAGE.ROUTINE_NOT_FOUND);
    }

    return routine;
  }

  async update(
    id: string,
    userId: string,
    updateDto: UpdateRoutineDto,
  ): Promise<RoutineResponseDto> {
    await this.findOne(id, userId);

    const updateData: any = {};
    if (updateDto.title !== undefined) {
      updateData.title = updateDto.title;
    }
    if (updateDto.goalType !== undefined) {
      updateData.goalType = updateDto.goalType;
    }
    if (updateDto.experienceLevel !== undefined) {
      updateData.experienceLevel = updateDto.experienceLevel;
    }
    if (updateDto.weeklyFrequency !== undefined) {
      updateData.weeklyFrequency = updateDto.weeklyFrequency;
    }
    if (updateDto.planWeeks !== undefined) {
      updateData.planWeeks = updateDto.planWeeks;
    }
    if (updateDto.sourceVersion !== undefined) {
      updateData.sourceVersion = updateDto.sourceVersion;
    }

    const routine = await this.prisma.routine.update({
      where: {
        id,
      },
      data: updateData,
      include: {
        days: {
          include: {
            exercises: {
              orderBy: {
                order: 'asc',
              },
            },
          },
          orderBy: {
            dayIndex: 'asc',
          },
        },
      },
    });

    return routine;
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);

    await this.prisma.routine.delete({
      where: {
        id,
      },
    });
  }

  async createLog(
    routineDayId: string,
    userId: string,
    createDto: CreateRoutineLogDto,
  ): Promise<RoutineLogResponseDto> {
    // 루틴 일차가 존재하고 사용자 소유인지 확인
    const routineDay = await this.prisma.routineDay.findFirst({
      where: {
        id: routineDayId,
        routine: {
          userId,
        },
      },
    });

    if (!routineDay) {
      throw new NotFoundException(ROUTINE_ERROR_MESSAGE.ROUTINE_DAY_NOT_FOUND);
    }

    const log = await this.prisma.routineLog.upsert({
      where: {
        routineDayId_date: {
          routineDayId,
          date: new Date(createDto.date),
        },
      },
      update: {
        isCompleted: createDto.isCompleted ?? false,
        completedAt: createDto.isCompleted === true ? new Date() : undefined,
      },
      create: {
        routineDayId,
        date: new Date(createDto.date),
        isCompleted: createDto.isCompleted ?? false,
        completedAt: createDto.isCompleted === true ? new Date() : undefined,
      },
    });

    return log;
  }

  async findLogsByDay(
    routineDayId: string,
    userId: string,
  ): Promise<RoutineLogResponseDto[]> {
    // 루틴 일차가 존재하고 사용자 소유인지 확인
    const routineDay = await this.prisma.routineDay.findFirst({
      where: {
        id: routineDayId,
        routine: {
          userId,
        },
      },
    });

    if (!routineDay) {
      throw new NotFoundException(ROUTINE_ERROR_MESSAGE.ROUTINE_DAY_NOT_FOUND);
    }

    const logs = await this.prisma.routineLog.findMany({
      where: {
        routineDayId,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return logs;
  }

  async removeLog(
    routineDayId: string,
    date: string,
    userId: string,
  ): Promise<void> {
    // 루틴 일차가 존재하고 사용자 소유인지 확인
    const routineDay = await this.prisma.routineDay.findFirst({
      where: {
        id: routineDayId,
        routine: {
          userId,
        },
      },
    });

    if (!routineDay) {
      throw new NotFoundException(ROUTINE_ERROR_MESSAGE.ROUTINE_DAY_NOT_FOUND);
    }

    const log = await this.prisma.routineLog.findUnique({
      where: {
        routineDayId_date: {
          routineDayId,
          date: new Date(date),
        },
      },
    });

    if (!log) {
      throw new NotFoundException(ROUTINE_ERROR_MESSAGE.ROUTINE_LOG_NOT_FOUND);
    }

    await this.prisma.routineLog.delete({
      where: {
        routineDayId_date: {
          routineDayId,
          date: new Date(date),
        },
      },
    });
  }

  async createRecommended(userId: string): Promise<RoutineResponseDto> {
    // 1) GoalProfile 조회
    const profile = await this.prisma.goalProfile.findUnique({
      where: { userId },
    });

    const goalType: GoalType = profile?.goalType ?? GoalType.MUSCLE_GAIN;
    const planWeeks = profile?.defaultPlanWeeks ?? 4;
    const freqRaw = profile?.weeklyFrequency ?? 3;
    const weeklyFrequency = ([3, 4, 5, 6].includes(freqRaw) ? freqRaw : 3) as
      | 3
      | 4
      | 5
      | 6;

    // 2) 1RM 조회(없어도 OK) → 누락은 0으로 채움
    const oneRmRecords = await this.prisma.oneRmRecord.findMany({
      where: { userId },
      orderBy: { measuredAt: 'desc' },
    });
    const { oneRmMap, missing } = buildLatestOneRmMapWithFallback(
      oneRmRecords,
      0,
    );

    // 3) 데이터가 부족하면 “완전 초보”로 강제
    // - 기준: 4대 1RM 중 하나라도 0이면 초보 루틴으로 단순화
    const forceBeginner = missing.length > 0;

    const experienceLevel: ExperienceLevel = forceBeginner
      ? ExperienceLevel.BEGINNER
      : (profile?.experienceLevel ?? ExperienceLevel.BEGINNER);

    const finalWeeklyFrequency: 3 | 4 | 5 | 6 = forceBeginner
      ? 3
      : weeklyFrequency;

    const title = forceBeginner
      ? '추천 루틴 (초보/데이터 미입력)'
      : '추천 루틴';
    const sourceVersion = forceBeginner ? 'rules-v1.0-fallback' : 'rules-v1.0';

    // 4) 엔진으로 dto 생성
    const dto = this.routineEngine.generate({
      title,
      goalType,
      experienceLevel,
      weeklyFrequency: finalWeeklyFrequency,
      planWeeks,
      sourceVersion,
      oneRmMap,
      randomizeExercisePick: false,
    }) as CreateRoutineDto;

    // 5) 누락된 1RM이 있는 anchorLift는 memo로 표시(선택이지만 UX 좋아짐)
    //    - 1RM=0이면 화면 중량은 0이 될 수 있으니, %만 참고하도록 안내
    const missingSet = new Set<OneRmLift>(missing);
    for (const day of dto.days) {
      for (const ex of day.exercises) {
        if (missingSet.has(ex.anchorLift)) {
          ex.memo =
            '1RM 미입력(0) 상태입니다. 중량은 계산되지 않으며 %1RM 기준으로만 진행하세요. 1RM 입력 시 중량이 계산됩니다.';
        }
      }
    }

    // 6) 기존 create 재사용하여 저장
    return this.create(userId, dto);
  }
}
