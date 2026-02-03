import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OneRmLift, OneRmRecord } from '@prisma/client';

@Injectable()
export class OneRmRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    userId: string;
    lift: OneRmLift;
    oneRmKg: number;
    measuredAt: Date;
  }): Promise<OneRmRecord> {
    return this.prisma.oneRmRecord.create({
      data,
    });
  }

  async findAllByUserId(
    userId: string,
    lift?: OneRmLift,
  ): Promise<OneRmRecord[]> {
    const where: any = { userId };
    if (lift) {
      where.lift = lift;
    }

    return this.prisma.oneRmRecord.findMany({
      where,
      orderBy: {
        measuredAt: 'desc',
      },
    });
  }

  async findByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<OneRmRecord | null> {
    return this.prisma.oneRmRecord.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async updateById(
    id: string,
    data: Partial<{
      lift: OneRmLift;
      oneRmKg: number;
      measuredAt: Date;
    }>,
  ): Promise<OneRmRecord> {
    return this.prisma.oneRmRecord.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.oneRmRecord.delete({
      where: { id },
    });
  }

  async findLatestByUserIdAndLift(
    userId: string,
    lift: OneRmLift,
  ): Promise<OneRmRecord | null> {
    return this.prisma.oneRmRecord.findFirst({
      where: {
        userId,
        lift,
      },
      orderBy: {
        measuredAt: 'desc',
      },
    });
  }
}

