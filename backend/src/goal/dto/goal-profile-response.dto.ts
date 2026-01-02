import { ApiProperty } from '@nestjs/swagger';
import { GoalType, ExperienceLevel } from '@prisma/client';

export class GoalProfileResponseDto {
  @ApiProperty({
    description: '목표 프로필 ID',
    example: 'clxxx123456789',
  })
  id: string;

  @ApiProperty({
    description: '사용자 ID',
    example: 'clxxx987654321',
  })
  userId: string;

  @ApiProperty({
    description: '목표 타입 (근비대/감량)',
    enum: GoalType,
    example: 'MUSCLE_GAIN',
  })
  goalType: GoalType;

  @ApiProperty({
    description: '운동 경험치',
    enum: ExperienceLevel,
    example: 'BEGINNER',
  })
  experienceLevel: ExperienceLevel;

  @ApiProperty({
    description: '주당 운동 횟수',
    example: 6,
  })
  weeklyFrequency: number;

  @ApiProperty({
    description: '수정일시',
    example: '2025-12-28T00:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: '생성일시',
    example: '2025-12-28T00:00:00.000Z',
  })
  createdAt: Date;
}
