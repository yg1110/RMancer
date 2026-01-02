import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BodyPart } from '@prisma/client';
import { RoutineSubExerciseResponseDto } from './routine-sub-exercise-response.dto';

export class RoutineDayResponseDto {
  @ApiProperty({
    description: '루틴 일차 ID',
    example: 'clxxx123456789',
  })
  id: string;

  @ApiProperty({
    description: '루틴 ID',
    example: 'clxxx987654321',
  })
  routineId: string;

  @ApiProperty({
    description: '요일 인덱스',
    example: 0,
  })
  dayIndex: number;

  @ApiProperty({
    description: '요일 이름',
    example: 'Upper A',
  })
  name: string;

  @ApiPropertyOptional({
    description: '운동 부위',
    enum: BodyPart,
    example: 'CHEST',
  })
  bodyPart?: BodyPart | null;

  @ApiProperty({
    description: '운동 목록',
    type: [RoutineSubExerciseResponseDto],
  })
  subExercises: RoutineSubExerciseResponseDto[];

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

