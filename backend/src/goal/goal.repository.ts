import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GoalProfile } from '@prisma/client';

@Injectable()
export class GoalProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<GoalProfile | null> {
    return this.prisma.goalProfile.findUnique({
      where: { userId },
    });
  }

  async create(data: {
    userId: string;
    goalType: string;
    experienceLevel: string;
    weeklyFrequency: number;
  }): Promise<GoalProfile> {
    return this.prisma.goalProfile.create({
      data,
    });
  }

  async updateByUserId(
    userId: string,
    data: Partial<{
      goalType: string;
      experienceLevel: string;
      weeklyFrequency: number;
    }>,
  ): Promise<GoalProfile> {
    return this.prisma.goalProfile.update({
      where: { userId },
      data,
    });
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.prisma.goalProfile.delete({
      where: { userId },
    });
  }
}

