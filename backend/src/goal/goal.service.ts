import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGoalProfileDto } from './dto/create-goal-profile.dto';
import { UpdateGoalProfileDto } from './dto/update-goal-profile.dto';
import { GoalProfileResponseDto } from './dto/goal-profile-response.dto';
import { GOAL_PROFILE_ERROR_MESSAGE } from './goal.constants';

@Injectable()
export class GoalProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    createDto: CreateGoalProfileDto,
  ): Promise<GoalProfileResponseDto> {
    const existingGoalProfile = await this.findOne(userId);
    if (existingGoalProfile) {
      throw new BadRequestException(
        GOAL_PROFILE_ERROR_MESSAGE.GOAL_PROFILE_ALREADY_EXISTS,
      );
    }
    const goalProfile = await this.prisma.goalProfile.create({
      data: {
        userId,
        goalType: createDto.goalType,
        experienceLevel: createDto.experienceLevel,
        weeklyFrequency: createDto.weeklyFrequency,
        defaultPlanWeeks: createDto.defaultPlanWeeks ?? 4,
      },
    });

    return goalProfile;
  }

  async findOne(userId: string): Promise<GoalProfileResponseDto> {
    const goalProfile = await this.prisma.goalProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!goalProfile) {
      throw new NotFoundException(
        GOAL_PROFILE_ERROR_MESSAGE.GOAL_PROFILE_NOT_FOUND,
      );
    }

    return goalProfile;
  }

  async update(
    userId: string,
    updateDto: UpdateGoalProfileDto,
  ): Promise<GoalProfileResponseDto> {
    await this.findOne(userId);

    const updateData: any = {};
    if (updateDto.goalType !== undefined) {
      updateData.goalType = updateDto.goalType;
    }
    if (updateDto.experienceLevel !== undefined) {
      updateData.experienceLevel = updateDto.experienceLevel;
    }
    if (updateDto.weeklyFrequency !== undefined) {
      updateData.weeklyFrequency = updateDto.weeklyFrequency;
    }
    if (updateDto.defaultPlanWeeks !== undefined) {
      updateData.defaultPlanWeeks = updateDto.defaultPlanWeeks;
    }

    const goalProfile = await this.prisma.goalProfile.update({
      where: {
        userId,
      },
      data: updateData,
    });

    return goalProfile;
  }

  async remove(userId: string): Promise<void> {
    await this.findOne(userId);

    await this.prisma.goalProfile.delete({
      where: {
        userId,
      },
    });
  }
}
