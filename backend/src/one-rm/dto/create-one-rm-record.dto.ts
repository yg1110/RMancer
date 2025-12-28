import { IsNumber, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OneRmLift } from '@prisma/client';

export class CreateOneRmRecordDto {
  @ApiProperty({
    description: '운동 종류',
    enum: OneRmLift,
    example: OneRmLift.BENCH_PRESS,
  })
  @IsEnum(OneRmLift)
  lift: OneRmLift;

  @ApiProperty({
    description: '1RM 무게(kg)',
    example: 100.5,
  })
  @IsNumber()
  oneRmKg: number;

  @ApiPropertyOptional({
    description: '측정일/입력 기준일 (정렬/최신 조회의 기준)',
    example: '2024-01-15T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  measuredAt?: string;
}

