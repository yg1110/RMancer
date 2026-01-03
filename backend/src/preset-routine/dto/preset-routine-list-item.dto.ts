import { ApiProperty } from '@nestjs/swagger';
import { GoalType, ExperienceLevel } from '@prisma/client';
import { PresetRoutineType } from '../preset-routine.service';

export class PresetRoutineListItemDto {
  @ApiProperty({
    description: '프리셋 루틴 타입',
    enum: PresetRoutineType,
    example: 'BEGINNER',
  })
  type: PresetRoutineType;

  @ApiProperty({
    description: '루틴 제목',
    example: '초보자용 전신 루틴',
  })
  title: string;

  @ApiProperty({
    description: '목표 타입',
    enum: GoalType,
    example: 'MUSCLE_GAIN',
  })
  goalType: GoalType;

  @ApiProperty({
    description: '경험 레벨',
    enum: ExperienceLevel,
    example: 'BEGINNER',
  })
  experienceLevel: ExperienceLevel;

  @ApiProperty({
    description: '주당 운동 횟수',
    example: 3,
  })
  weeklyFrequency: number;

  @ApiProperty({
    description: '루틴 한줄 설명',
    example: '운동 초보자를 위한 전신 운동 기초 루틴',
  })
  description: string;
}

