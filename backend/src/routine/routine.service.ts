import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { RoutineResponseDto } from './dto/routine-response.dto';
import { CreateRoutineLogDto } from './dto/create-routine-log.dto';
import { RoutineLogResponseDto } from './dto/routine-log-response.dto';
import { ROUTINE_ERROR_MESSAGE } from './routine.constants';

@Injectable()
export class RoutineService {
  constructor(private readonly prisma: PrismaService) {}

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
}
