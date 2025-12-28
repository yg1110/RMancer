import {
  IsString,
  IsInt,
  IsEnum,
  Min,
  Max,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateRoutineDayDto } from './create-routine-day.dto';
import { GoalType, ExperienceLevel } from '@prisma/client';

export class CreateRoutineDto {
  @ApiProperty({
    description: '화면 표시용 제목 (ex: "근비대 4주 / 주4회")',
    example: '근비대 4주 / 주4회',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '추천 당시 목표 타입',
    enum: GoalType,
    example: GoalType.MUSCLE_GAIN,
  })
  @IsEnum(GoalType)
  goalType: GoalType;

  @ApiProperty({
    description: '추천 당시 경험치',
    enum: ExperienceLevel,
    example: ExperienceLevel.INTERMEDIATE,
  })
  @IsEnum(ExperienceLevel)
  experienceLevel: ExperienceLevel;

  @ApiProperty({
    description: '추천 당시 주당 횟수',
    example: 4,
  })
  @IsInt()
  @Min(1)
  @Max(7)
  weeklyFrequency: number;

  @ApiProperty({
    description: '추천 기간(주) - 1~4',
    example: 4,
  })
  @IsInt()
  @Min(1)
  @Max(4)
  planWeeks: number;

  @ApiProperty({
    description: '추천 룰 버전(추천 알고리즘 변경 시 재현 가능하게)',
    example: '1.0.0',
  })
  @IsString()
  sourceVersion: string;

  @ApiProperty({
    description: '루틴 일차 목록',
    type: [CreateRoutineDayDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRoutineDayDto)
  days: CreateRoutineDayDto[];
}

