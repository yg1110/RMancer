import { IsNumber, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { OneRmLift } from '@prisma/client';

export class UpdateOneRmRecordDto {
  @ApiPropertyOptional({
    description: '운동 종류',
    enum: OneRmLift,
    example: OneRmLift.BENCH_PRESS,
  })
  @IsOptional()
  @IsEnum(OneRmLift)
  lift?: OneRmLift;

  @ApiPropertyOptional({
    description: '1RM 무게(kg)',
    example: 100.5,
  })
  @IsOptional()
  @IsNumber()
  oneRmKg?: number;

  @ApiPropertyOptional({
    description: '측정일/입력 기준일 (정렬/최신 조회의 기준)',
    example: '2024-01-15T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  measuredAt?: string;
}

