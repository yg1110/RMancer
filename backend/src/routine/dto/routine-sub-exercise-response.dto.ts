import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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
    type: Number,
    example: 3,
  })
  @IsOptional()
  @IsNumber()
  sets?: number | null;

  @ApiPropertyOptional({
    description: '반복 수',
    type: Number,
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  reps?: number | null;

  @ApiPropertyOptional({
    description: '1RM 퍼센트',
    type: Number,
    example: 0.3,
  })
  @IsOptional()
  @IsNumber()
  oneRmPct?: number | null;

  @ApiPropertyOptional({
    description: '운동 이름',
    type: String,
    example: '벤치프레스',
  })
  @IsOptional()
  @IsString()
  exerciseName?: string | null;

  @ApiPropertyOptional({
    description: '운동 부위',
    type: String,
    example: 'CHEST',
  })
  @IsOptional()
  @IsString()
  bodyPart?: string | null;

  @ApiPropertyOptional({
    description: '선택 가능한 운동 목록',
    type: String,
    example: '딥스, 덤벨프레스, 인클라인덤벨프레스, 케이블크로스오버 택 1개',
  })
  @IsOptional()
  @IsString()
  chooseOneExercises?: string | null;

  @ApiPropertyOptional({
    description: '운동 메모',
    type: String,
    example: '(5T2P)',
  })
  @IsOptional()
  @IsString()
  memo?: string | null;

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
