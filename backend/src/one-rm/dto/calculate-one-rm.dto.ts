import { IsNumber, IsEnum, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OneRmLift } from '@prisma/client';

export class CalculateOneRmDto {
  @ApiProperty({
    description: '운동 종류',
    enum: OneRmLift,
    example: OneRmLift.BENCH_PRESS,
  })
  @IsEnum(OneRmLift)
  lift: OneRmLift;

  @ApiProperty({
    description: '들어올린 무게(kg)',
    example: 80.5,
  })
  @IsNumber()
  @Min(0.1)
  weightKg: number;

  @ApiProperty({
    description: '반복 횟수',
    example: 5,
  })
  @IsNumber()
  @Min(1)
  @Max(36)
  reps: number;
}

