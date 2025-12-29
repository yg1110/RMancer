import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DashboardResponseDto } from './dto/dashboard-response.dto';
import { GoalProfileResponseDto } from '../goal/dto/goal-profile-response.dto';
import { InbodyRecordResponseDto } from '../inbody/dto/inbody-record-response.dto';
import { OneRmService } from '../one-rm/one-rm.service';

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
}
