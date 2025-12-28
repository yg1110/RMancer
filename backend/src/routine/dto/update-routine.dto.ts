import {
  IsString,
  IsInt,
  IsEnum,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { GoalType, ExperienceLevel } from '@prisma/client';

export class UpdateRoutineDto {
  @ApiPropertyOptional({
    description: '화면 표시용 제목 (ex: "근비대 4주 / 주4회")',
    example: '근비대 4주 / 주4회',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: '추천 당시 목표 타입',
    enum: GoalType,
    example: GoalType.MUSCLE_GAIN,
  })
  @IsOptional()
  @IsEnum(GoalType)
  goalType?: GoalType;

  @ApiPropertyOptional({
    description: '추천 당시 경험치',
    enum: ExperienceLevel,
    example: ExperienceLevel.INTERMEDIATE,
  })
  @IsOptional()
  @IsEnum(ExperienceLevel)
  experienceLevel?: ExperienceLevel;

  @ApiPropertyOptional({
    description: '추천 당시 주당 횟수',
    example: 4,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(7)
  weeklyFrequency?: number;

  @ApiPropertyOptional({
    description: '추천 기간(주) - 1~4',
    example: 4,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(4)
  planWeeks?: number;

  @ApiPropertyOptional({
    description: '추천 룰 버전(추천 알고리즘 변경 시 재현 가능하게)',
    example: '1.0.0',
  })
  @IsOptional()
  @IsString()
  sourceVersion?: string;
}

