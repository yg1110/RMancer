import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InbodyRecord } from '@prisma/client';

@Injectable()
export class InbodyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    userId: string;
    measuredAt: Date;
    heightCm: number;
    weightKg: number;
    skeletalMuscleKg: number;
    bodyFatKg: number;
    bodyFatPct: number;
  }): Promise<InbodyRecord> {
    return this.prisma.inbodyRecord.create({
      data,
    });
  }

  async findAllByUserId(userId: string): Promise<InbodyRecord[]> {
    return this.prisma.inbodyRecord.findMany({
      where: {
        userId,
      },
      orderBy: {
        measuredAt: 'desc',
      },
    });
  }

  async findByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<InbodyRecord | null> {
    return this.prisma.inbodyRecord.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async updateById(
    id: string,
    data: Partial<{
      measuredAt: Date;
      heightCm: number;
      weightKg: number;
      skeletalMuscleKg: number;
      bodyFatKg: number;
      bodyFatPct: number;
    }>,
  ): Promise<InbodyRecord> {
    return this.prisma.inbodyRecord.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.inbodyRecord.delete({
      where: {
        id,
      },
    });
  }

  async findLatestByUserId(userId: string): Promise<InbodyRecord | null> {
    return this.prisma.inbodyRecord.findFirst({
      where: {
        userId,
      },
      orderBy: {
        measuredAt: 'desc',
      },
    });
  }
}

