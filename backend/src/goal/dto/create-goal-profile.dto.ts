import { IsEnum, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GoalType, ExperienceLevel } from '@prisma/client';

export class CreateGoalProfileDto {
  @ApiProperty({
    description: '목표 타입 (근비대/감량)',
    enum: GoalType,
    example: 'FAT_LOSS',
  })
  @IsEnum(GoalType)
  goalType: GoalType;

  @ApiProperty({
    description: '운동 경험치',
    enum: ExperienceLevel,
    example: 'INTERMEDIATE',
  })
  @IsEnum(ExperienceLevel)
  experienceLevel: ExperienceLevel;

  @ApiProperty({
    description: '주당 운동 횟수 (3~6 권장)',
    example: 6,
    minimum: 3,
    maximum: 6,
  })
  @IsInt()
  @Min(3)
  @Max(6)
  weeklyFrequency: number;
}
