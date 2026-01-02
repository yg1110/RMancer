import {
  IsString,
  IsEnum,
  IsInt,
  IsArray,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { GoalType, ExperienceLevel } from '@prisma/client';
import { CreateRoutineDayDto } from './create-routine-day.dto';

export class CreateRoutineDto {
  @ApiProperty({
    description: '루틴 제목',
    example: '근비대 4주 / 주4회',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '목표 타입',
    enum: GoalType,
    example: 'MUSCLE_GAIN',
  })
  @IsEnum(GoalType)
  goalType: GoalType;

  @ApiProperty({
    description: '경험 레벨',
    enum: ExperienceLevel,
    example: 'INTERMEDIATE',
  })
  @IsEnum(ExperienceLevel)
  experienceLevel: ExperienceLevel;

  @ApiProperty({
    description: '주당 운동 횟수',
    example: 4,
    minimum: 3,
    maximum: 6,
  })
  @IsInt()
  @Min(3)
  @Max(6)
  weeklyFrequency: number;

  @ApiProperty({
    description: '루틴 일차 목록',
    type: [CreateRoutineDayDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRoutineDayDto)
  days: CreateRoutineDayDto[];
}
