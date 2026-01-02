import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BodyPart } from '@prisma/client';

export class CreateRoutineSubExerciseDto {
  @ApiProperty({
    description: '운동 순서',
    example: 0,
  })
  @IsNumber()
  @Min(0)
  order: number;

  @ApiPropertyOptional({
    description: '세트 수',
    example: 3,
  })
  @IsOptional()
  @IsNumber()
  sets?: number;

  @ApiPropertyOptional({
    description: '반복 수',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  reps?: number;

  @ApiPropertyOptional({
    description: '1RM 퍼센트',
    example: 75.5,
  })
  @IsOptional()
  @IsNumber()
  oneRmPct?: number;

  @ApiPropertyOptional({
    description: '운동 이름',
    example: '벤치프레스',
  })
  @IsOptional()
  @IsString()
  exerciseName?: string;

  @ApiPropertyOptional({
    description: '운동 부위',
    enum: BodyPart,
    example: 'CHEST',
  })
  @IsOptional()
  bodyPart?: BodyPart;

  @ApiPropertyOptional({
    description: '선택 가능한 운동 목록',
    example: '딥스, 덤벨프레스, 인클라인덤벨프레스, 케이블크로스오버 택 1개',
  })
  @IsOptional()
  @IsString()
  chooseOneExercises?: string;

  @ApiPropertyOptional({
    description: '운동 메모',
    example: '(5T2P)',
  })
  @IsOptional()
  @IsString()
  memo?: string;
}
