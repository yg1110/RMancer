import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DashboardResponseDto } from './dto/dashboard-response.dto';
import { GoalProfileResponseDto } from '../goal/dto/goal-profile-response.dto';
import { InbodyRecordResponseDto } from '../inbody/dto/inbody-record-response.dto';
import { OneRmService } from '../one-rm/one-rm.service';
import { CreateDashboardProfileDto } from './dto/create-dashboard-profile.dto';
import { DashboardProfileResponseDto } from './dto/dashboard-profile-response.dto';

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly oneRmService: OneRmService,
  ) {}

  async getLatestData(userId: string): Promise<DashboardResponseDto> {
    // 가장 최근 목표 프로필 조회
    const latestGoal = await this.prisma.goalProfile.findUnique({
      where: {
        userId,
      },
    });

    // 가장 최근 인바디 기록 조회
    const latestInbody = await this.prisma.inbodyRecord.findFirst({
      where: {
        userId,
      },
      orderBy: {
        measuredAt: 'desc',
      },
    });

    // 가장 최근 1RM 기록 조회
    const latestOneRm = await this.oneRmService.getAllOneRmObject(userId);

    return {
      latestGoal: latestGoal as GoalProfileResponseDto | null,
      latestInbody: latestInbody as InbodyRecordResponseDto | null,
      latestOneRm: latestOneRm,
    };
  }

  async createProfileWithRecords(
    userId: string,
    createDto: CreateDashboardProfileDto,
  ): Promise<DashboardProfileResponseDto> {
    try {
      // Prisma 트랜잭션을 사용하여 모든 작업을 원자적으로 처리
      const result = await this.prisma.$transaction(async tx => {
        // 1. Goal Profile 생성 또는 업데이트
        const goalProfile = await tx.goalProfile.upsert({
          where: { userId },
          update: {
            goalType: createDto.goalProfile.goalType,
            experienceLevel: createDto.goalProfile.experienceLevel,
            weeklyFrequency: createDto.goalProfile.weeklyFrequency,
          },
          create: {
            userId,
            goalType: createDto.goalProfile.goalType,
            experienceLevel: createDto.goalProfile.experienceLevel,
            weeklyFrequency: createDto.goalProfile.weeklyFrequency,
          },
        });

        // 2. Inbody Record 생성
        const inbodyRecord = await tx.inbodyRecord.create({
          data: {
            userId,
            measuredAt: new Date(createDto.inbodyRecord.measuredAt),
            heightCm: createDto.inbodyRecord.heightCm,
            weightKg: createDto.inbodyRecord.weightKg,
            skeletalMuscleKg: createDto.inbodyRecord.skeletalMuscleKg,
            bodyFatKg: createDto.inbodyRecord.bodyFatKg,
            bodyFatPct: createDto.inbodyRecord.bodyFatPct,
          },
        });

        // 3. OneRM Records 생성 (여러 개)
        const oneRmRecords = await Promise.all(
          createDto.oneRmRecords.map(record =>
            tx.oneRmRecord.create({
              data: {
                userId,
                lift: record.lift,
                oneRmKg: record.oneRmKg,
                measuredAt: new Date(),
              },
            }),
          ),
        );

        return {
          goalProfile,
          inbodyRecord,
          oneRmRecords,
        };
      });

      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        '프로필 및 기록 생성에 실패했습니다.',
      );
    }
  }
}
