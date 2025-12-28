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
    description: '화면 표시용 제목 (ex: "근비대 4주 / 주4회")',
    example: '근비대 4주 / 주4회',
  })
  title: string;

  @ApiProperty({
    description: '추천 당시 목표 타입',
    enum: GoalType,
    example: GoalType.MUSCLE_GAIN,
  })
  goalType: GoalType;

  @ApiProperty({
    description: '추천 당시 경험치',
    enum: ExperienceLevel,
    example: ExperienceLevel.INTERMEDIATE,
  })
  experienceLevel: ExperienceLevel;

  @ApiProperty({
    description: '추천 당시 주당 횟수',
    example: 4,
  })
  weeklyFrequency: number;

  @ApiProperty({
    description: '추천 기간(주) - 1~4',
    example: 4,
  })
  planWeeks: number;

  @ApiProperty({
    description: '추천 룰 버전(추천 알고리즘 변경 시 재현 가능하게)',
    example: '1.0.0',
  })
  sourceVersion: string;

  @ApiProperty({
    description: '생성일시',
    example: '2025-12-28T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '루틴 일차 목록',
    type: [RoutineDayResponseDto],
  })
  days: RoutineDayResponseDto[];
}

