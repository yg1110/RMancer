import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RoutineSubExerciseResponseDto {
  @ApiProperty({
    description: '운동 ID',
    example: 'clxxx123456789',
  })
  id: string;

  @ApiProperty({
    description: '루틴 일차 ID',
    example: 'clxxx987654321',
  })
  routineDayId: string;

  @ApiProperty({
    description: '운동 순서',
    example: 0,
  })
  order: number;

  @ApiPropertyOptional({
    description: '세트 수',
    example: 3,
  })
  sets?: number | null;

  @ApiPropertyOptional({
    description: '반복 수',
    example: 10,
  })
  reps?: number | null;

  @ApiPropertyOptional({
    description: '1RM 퍼센트',
    example: 0.3,
  })
  oneRmPct?: number | null;

  @ApiPropertyOptional({
    description: '운동 이름',
    example: '벤치프레스',
  })
  exerciseName?: string | null;

  @ApiPropertyOptional({
    description: '선택 가능한 운동 목록',
    example: '딥스, 덤벨프레스, 인클라인덤벨프레스, 케이블크로스오버 택 1개',
  })
  chooseOneExercises?: string | null;

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
