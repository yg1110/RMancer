import {
  IsString,
  IsEnum,
  IsInt,
  IsArray,
  ValidateNested,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { GoalType, ExperienceLevel } from '@prisma/client';
import { CreateRoutineDayDto } from './create-routine-day.dto';

export class UpdateRoutineDto {
  @ApiPropertyOptional({
    description: '루틴 제목',
    example: '근비대 4주 / 주4회',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: '목표 타입',
    enum: GoalType,
    example: 'MUSCLE_GAIN',
  })
  @IsOptional()
  @IsEnum(GoalType)
  goalType?: GoalType;

  @ApiPropertyOptional({
    description: '경험 레벨',
    enum: ExperienceLevel,
    example: 'INTERMEDIATE',
  })
  @IsOptional()
  @IsEnum(ExperienceLevel)
  experienceLevel?: ExperienceLevel;

  @ApiPropertyOptional({
    description: '주당 운동 횟수',
    example: 4,
    minimum: 3,
    maximum: 6,
  })
  @IsOptional()
  @IsInt()
  @Min(3)
  @Max(6)
  weeklyFrequency?: number;

  @ApiPropertyOptional({
    description: '루틴 일차 목록',
    type: [CreateRoutineDayDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRoutineDayDto)
  days?: CreateRoutineDayDto[];
}
