import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateGoalProfileDto } from './dto/create-goal-profile.dto';
import { UpdateGoalProfileDto } from './dto/update-goal-profile.dto';
import { GoalProfileResponseDto } from './dto/goal-profile-response.dto';
import { GOAL_PROFILE_ERROR_MESSAGE } from './goal.constants';
import { GoalProfileRepository } from './goal.repository';

@Injectable()
export class GoalProfileService {
  constructor(private readonly goalProfileRepository: GoalProfileRepository) {}

  async create(
    userId: string,
    createDto: CreateGoalProfileDto,
  ): Promise<GoalProfileResponseDto> {
    const existingGoalProfile = await this.findOne(userId);

    try {
      if (existingGoalProfile) {
        const updatedGoalProfile = await this.goalProfileRepository.updateByUserId(
          userId,
          {
            goalType: createDto.goalType,
            experienceLevel: createDto.experienceLevel,
            weeklyFrequency: createDto.weeklyFrequency,
          },
        );
        return updatedGoalProfile;
      } else {
        const goalProfile = await this.goalProfileRepository.create({
          userId,
          goalType: createDto.goalType,
          experienceLevel: createDto.experienceLevel,
          weeklyFrequency: createDto.weeklyFrequency,
        });
        return goalProfile;
      }
    } catch (error) {
      throw new InternalServerErrorException(
        GOAL_PROFILE_ERROR_MESSAGE.GOAL_PROFILE_CREATE_FAILED,
      );
    }
  }

  async findOne(userId: string): Promise<GoalProfileResponseDto | null> {
    return this.goalProfileRepository.findByUserId(userId);
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

    return this.goalProfileRepository.updateByUserId(userId, updateData);
  }

  async remove(userId: string): Promise<void> {
    await this.findOne(userId);

    await this.goalProfileRepository.deleteByUserId(userId);
  }
}
