import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LoadMethod, OneRmLift } from '@prisma/client';
import { IsEnum } from 'class-validator';

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

  @ApiProperty({
    description: '% 범위(min)',
    example: 0.65,
  })
  pctMin: number;

  @ApiProperty({
    description: '% 범위(max)',
    example: 0.75,
  })
  pctMax: number;

  @ApiProperty({
    description: 'OneRM 리프트',
    example: 'BACK_SQUAT',
  })
  @IsEnum(OneRmLift)
  anchorLift: OneRmLift;

  @ApiProperty({
    description: '로드 방법',
    enum: LoadMethod,
    example: LoadMethod.PERCENT_1RM,
  })
  @IsEnum(LoadMethod)
  loadMethod: LoadMethod;

  @ApiPropertyOptional({
    description: '안내 문구(선택)',
    example: '가슴 중앙에 집중',
  })
  memo: string | null;
}
