import { IsEnum, IsInt, Min, Max, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { GoalType, ExperienceLevel } from '@prisma/client';

export class UpdateGoalProfileDto {
  @ApiPropertyOptional({
    description: '목표 타입 (근비대/감량)',
    enum: GoalType,
    example: 'MUSCLE_GAIN',
  })
  @IsOptional()
  @IsEnum(GoalType)
  goalType?: GoalType;

  @ApiPropertyOptional({
    description: '운동 경험치',
    enum: ExperienceLevel,
    example: 'BEGINNER',
  })
  @IsOptional()
  @IsEnum(ExperienceLevel)
  experienceLevel?: ExperienceLevel;

  @ApiPropertyOptional({
    description: '주당 운동 횟수 (3~6 권장)',
    example: 6,
    minimum: 3,
    maximum: 6,
  })
  @IsOptional()
  @IsInt()
  @Min(3)
  @Max(6)
  weeklyFrequency?: number;
}
