import { ApiProperty } from '@nestjs/swagger';
import { GoalType, ExperienceLevel } from '@prisma/client';
import { RoutineDayResponseDto } from './routine-day-response.dto';

export class RoutineResponseDto {
  @ApiProperty({
    description: '루틴 ID',
    example: 'clxxx123456789',
  })
  id: string;

  @ApiProperty({
    description: '사용자 ID',
    example: 'clxxx987654321',
  })
  userId: string;

  @ApiProperty({
    description: '루틴 제목',
    example: '근비대 4주 / 주4회',
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
    example: 'INTERMEDIATE',
  })
  experienceLevel: ExperienceLevel;

  @ApiProperty({
    description: '주당 운동 횟수',
    example: 4,
  })
  weeklyFrequency: number;

  @ApiProperty({
    description: '루틴 일차 목록',
    type: [RoutineDayResponseDto],
  })
  days: RoutineDayResponseDto[];

  @ApiProperty({
    description: '생성일시',
    example: '2025-12-28T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정일시',
    example: '2025-12-28T00:00:00.000Z',
  })
  updatedAt: Date;
}
