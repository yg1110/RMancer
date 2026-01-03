import { Injectable } from '@nestjs/common';
import { CreateRoutineDto } from '../routine/dto/create-routine.dto';
import { BEGINNER_ROUTINE } from './constants/beginner.constants';
import { INTERMEDIATE_ROUTINE } from './constants/intermediate.constants';
import { ADVANCED_ROUTINE } from './constants/advanced.constants';
import { STRENGTH_ROUTINE } from './constants/strength.constants';
import { FAT_LOSS_ROUTINE } from './constants/fat-loss.constants';
import { PresetRoutineListItemDto } from './dto/preset-routine-list-item.dto';
import { GIANT_ROUTINE } from './constants/giant.constants';
import { RoutineResponseDto } from 'src/routine/dto/routine-response.dto';
import { RoutineService } from 'src/routine/routine.service';
import { CreateRoutineDayDto } from 'src/routine/dto/create-routine-day.dto';

export enum PresetRoutineType {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  STRENGTH = 'STRENGTH',
  FAT_LOSS = 'FAT_LOSS',
  GIANT = 'GIANT',
}

@Injectable()
export class PresetRoutineService {
  constructor(private readonly routineService: RoutineService) {}

  getBeginnerRoutine(): CreateRoutineDto {
    return BEGINNER_ROUTINE;
  }

  getIntermediateRoutine(): CreateRoutineDto {
    return INTERMEDIATE_ROUTINE;
  }

  getAdvancedRoutine(): CreateRoutineDto {
    return ADVANCED_ROUTINE;
  }

  getStrengthRoutine(): CreateRoutineDto {
    return STRENGTH_ROUTINE;
  }

  getFatLossRoutine(): CreateRoutineDto {
    return FAT_LOSS_ROUTINE;
  }

  getGiantRoutine(): CreateRoutineDto {
    return GIANT_ROUTINE;
  }

  getRoutineDtoByPresetRoutineType(
    presetRoutineType: PresetRoutineType,
  ): CreateRoutineDto {
    switch (presetRoutineType) {
      case PresetRoutineType.BEGINNER:
        return BEGINNER_ROUTINE;
      case PresetRoutineType.INTERMEDIATE:
        return INTERMEDIATE_ROUTINE;
      case PresetRoutineType.ADVANCED:
        return ADVANCED_ROUTINE;
      case PresetRoutineType.STRENGTH:
        return STRENGTH_ROUTINE;
      case PresetRoutineType.FAT_LOSS:
        return FAT_LOSS_ROUTINE;
      case PresetRoutineType.GIANT:
        return GIANT_ROUTINE;
    }
  }

  getAllPresetRoutines(): PresetRoutineListItemDto[] {
    return [
      {
        type: PresetRoutineType.BEGINNER,
        title: BEGINNER_ROUTINE.title,
        description: BEGINNER_ROUTINE.description || '',
        goalType: BEGINNER_ROUTINE.goalType,
        experienceLevel: BEGINNER_ROUTINE.experienceLevel,
        weeklyFrequency: BEGINNER_ROUTINE.weeklyFrequency,
      },
      {
        type: PresetRoutineType.INTERMEDIATE,
        title: INTERMEDIATE_ROUTINE.title,
        description: INTERMEDIATE_ROUTINE.description || '',
        goalType: INTERMEDIATE_ROUTINE.goalType,
        experienceLevel: INTERMEDIATE_ROUTINE.experienceLevel,
        weeklyFrequency: INTERMEDIATE_ROUTINE.weeklyFrequency,
      },
      {
        type: PresetRoutineType.ADVANCED,
        title: ADVANCED_ROUTINE.title,
        description: ADVANCED_ROUTINE.description || '',
        goalType: ADVANCED_ROUTINE.goalType,
        experienceLevel: ADVANCED_ROUTINE.experienceLevel,
        weeklyFrequency: ADVANCED_ROUTINE.weeklyFrequency,
      },
      {
        type: PresetRoutineType.STRENGTH,
        title: STRENGTH_ROUTINE.title,
        description: STRENGTH_ROUTINE.description || '',
        goalType: STRENGTH_ROUTINE.goalType,
        experienceLevel: STRENGTH_ROUTINE.experienceLevel,
        weeklyFrequency: STRENGTH_ROUTINE.weeklyFrequency,
      },
      {
        type: PresetRoutineType.FAT_LOSS,
        title: FAT_LOSS_ROUTINE.title,
        description: FAT_LOSS_ROUTINE.description || '',
        goalType: FAT_LOSS_ROUTINE.goalType,
        experienceLevel: FAT_LOSS_ROUTINE.experienceLevel,
        weeklyFrequency: FAT_LOSS_ROUTINE.weeklyFrequency,
      },
      {
        type: PresetRoutineType.GIANT,
        title: GIANT_ROUTINE.title,
        description: GIANT_ROUTINE.description || '',
        goalType: GIANT_ROUTINE.goalType,
        experienceLevel: GIANT_ROUTINE.experienceLevel,
        weeklyFrequency: GIANT_ROUTINE.weeklyFrequency,
      },
    ];
  }

  async createRecommendedRoutine(
    userId: string,
    presetRoutineType: PresetRoutineType,
  ): Promise<RoutineResponseDto> {
    const createDto = this.getRoutineDtoByPresetRoutineType(presetRoutineType);
    const routine = await this.routineService.create(userId, createDto);
    return routine;
  }
}
