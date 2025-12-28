import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RoutineExerciseResponseDto {
  @ApiProperty({
    description: '운동 항목 ID',
    example: 'clxxx123456789',
  })
  id: string;

  @ApiProperty({
    description: '루틴 일차 ID',
    example: 'clxxx987654321',
  })
  routineDayId: string;

  @ApiProperty({
    description: '화면 표시 순서',
    example: 0,
  })
  order: number;

  @ApiProperty({
    description: '운동 키(코드 상수/카탈로그 키)',
    example: 'bench_press',
  })
  exerciseKey: string;

  @ApiProperty({
    description: '표시명(한글명 등)',
    example: '벤치프레스',
  })
  displayName: string;

  @ApiProperty({
    description: '세트 수',
    example: 3,
  })
  sets: number;

  @ApiProperty({
    description: '반복 범위(min)',
    example: 8,
  })
  repsMin: number;

  @ApiProperty({
    description: '반복 범위(max)',
    example: 12,
  })
  repsMax: number;

  @ApiProperty({
    description: '휴식(초)',
    example: 90,
  })
  restSec: number;

  @ApiProperty({
    description: 'RIR 범위(min)',
    example: 0,
  })
  rirMin: number;

  @ApiProperty({
    description: 'RIR 범위(max)',
    example: 2,
  })
  rirMax: number;

  @ApiPropertyOptional({
    description: '안내 문구(선택)',
    example: '가슴 중앙에 집중',
  })
  memo: string | null;
}

