import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { RoutineResponseDto } from './dto/routine-response.dto';
import { ROUTINE_ERROR_MESSAGE } from './routine.constants';

@Injectable()
export class RoutineService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    createDto: CreateRoutineDto,
  ): Promise<RoutineResponseDto> {
    try {
      const routine = await this.prisma.routine.create({
        data: {
          userId,
          title: createDto.title,
          goalType: createDto.goalType,
          experienceLevel: createDto.experienceLevel,
          weeklyFrequency: createDto.weeklyFrequency,
          days: {
            create: createDto.days.map(day => ({
              dayIndex: day.dayIndex,
              name: day.name,
              bodyPart: day.bodyPart,
              subExercises: {
                create: day.subExercises.map(exercise => ({
                  order: exercise.order,
                  sets: exercise.sets,
                  reps: exercise.reps,
                  oneRmPct: exercise.oneRmPct,
                  exerciseName: exercise.exerciseName,
                  bodyPart: exercise.bodyPart,
                  chooseOneExercises: exercise.chooseOneExercises,
                })),
              },
            })),
          },
        },
        include: {
          days: {
            include: {
              subExercises: true,
            },
            orderBy: {
              dayIndex: 'asc',
            },
          },
        },
      });

      return routine;
    } catch (error) {
      throw new InternalServerErrorException(
        ROUTINE_ERROR_MESSAGE.ROUTINE_CREATE_FAILED,
      );
    }
  }

  async findAll(userId: string): Promise<RoutineResponseDto[]> {
    const routines = await this.prisma.routine.findMany({
      where: {
        userId,
      },
      include: {
        days: {
          include: {
            subExercises: true,
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

  async getLatestRoutine(userId: string): Promise<RoutineResponseDto> {
    const routine = await this.prisma.routine.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        days: {
          include: {
            subExercises: true,
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

  async findOne(id: string, userId: string): Promise<RoutineResponseDto> {
    const routine = await this.prisma.routine.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        days: {
          include: {
            subExercises: true,
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

    // days가 제공된 경우, 기존 days를 모두 삭제하고 새로 생성
    if (updateDto.days !== undefined) {
      // 기존 days와 subExercises를 모두 삭제
      await this.prisma.routineSubExercise.deleteMany({
        where: {
          routineDay: {
            routineId: id,
          },
        },
      });
      await this.prisma.routineDay.deleteMany({
        where: {
          routineId: id,
        },
      });

      // 새로운 days와 subExercises 생성
      updateData.days = {
        create: updateDto.days.map(day => ({
          dayIndex: day.dayIndex,
          name: day.name,
          bodyPart: day.bodyPart,
          subExercises: {
            create: day.subExercises.map(exercise => ({
              order: exercise.order,
              sets: exercise.sets,
              reps: exercise.reps,
              oneRmPct: exercise.oneRmPct,
              exerciseName: exercise.exerciseName,
              chooseOneExercises: exercise.chooseOneExercises,
            })),
          },
        })),
      };
    }

    const routine = await this.prisma.routine.update({
      where: {
        id,
      },
      data: updateData,
      include: {
        days: {
          include: {
            subExercises: true,
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

    // Cascade delete로 인해 자동으로 days와 subExercises도 삭제됨
    await this.prisma.routine.delete({
      where: {
        id,
      },
    });
  }
}
