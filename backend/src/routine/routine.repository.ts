import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Routine } from '@prisma/client';

@Injectable()
export class RoutineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createWithDays(data: any): Promise<Routine> {
    return this.prisma.routine.create({
      data,
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
  }

  async findAllByUserId(userId: string): Promise<Routine[]> {
    return this.prisma.routine.findMany({
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
  }

  async findLatestByUserId(userId: string): Promise<Routine | null> {
    return this.prisma.routine.findFirst({
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
  }

  async findByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<Routine | null> {
    return this.prisma.routine.findFirst({
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
  }

  async deleteSubExercisesByRoutineId(routineId: string): Promise<void> {
    await this.prisma.routineSubExercise.deleteMany({
      where: {
        routineDay: {
          routineId,
        },
      },
    });
  }

  async deleteDaysByRoutineId(routineId: string): Promise<void> {
    await this.prisma.routineDay.deleteMany({
      where: {
        routineId,
      },
    });
  }

  async updateWithDays(
    id: string,
    data: any,
  ): Promise<Routine> {
    return this.prisma.routine.update({
      where: {
        id,
      },
      data,
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
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.routine.delete({
      where: {
        id,
      },
    });
  }
}

