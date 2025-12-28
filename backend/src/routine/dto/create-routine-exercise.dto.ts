import { IsString, IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoutineExerciseDto {
  @ApiProperty({
    description: '화면 표시 순서',
    example: 0,
  })
  @IsInt()
  @Min(0)
  order: number;

  @ApiProperty({
    description: '운동 키(코드 상수/카탈로그 키)',
    example: 'bench_press',
  })
  @IsString()
  exerciseKey: string;

  @ApiProperty({
    description: '표시명(한글명 등)',
    example: '벤치프레스',
  })
  @IsString()
  displayName: string;

  @ApiProperty({
    description: '세트 수',
    example: 3,
  })
  @IsInt()
  @Min(1)
  sets: number;

  @ApiProperty({
    description: '반복 범위(min)',
    example: 8,
  })
  @IsInt()
  @Min(1)
  repsMin: number;

  @ApiProperty({
    description: '반복 범위(max)',
    example: 12,
  })
  @IsInt()
  @Min(1)
  repsMax: number;

  @ApiProperty({
    description: '휴식(초)',
    example: 90,
  })
  @IsInt()
  @Min(0)
  restSec: number;

  @ApiProperty({
    description: 'RIR 범위(min)',
    example: 0,
  })
  @IsInt()
  @Min(0)
  rirMin: number;

  @ApiProperty({
    description: 'RIR 범위(max)',
    example: 2,
  })
  @IsInt()
  @Min(0)
  rirMax: number;

  @ApiPropertyOptional({
    description: '안내 문구(선택)',
    example: '가슴 중앙에 집중',
  })
  @IsOptional()
  @IsString()
  memo?: string;
}

