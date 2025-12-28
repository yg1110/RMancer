import { IsNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateInbodyRecordDto {
  @ApiPropertyOptional({
    description: '측정일/입력 기준일 (정렬/최신 조회의 기준)',
    example: '2024-01-15T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  measuredAt?: string;

  @ApiPropertyOptional({
    description: '키(cm)',
    example: 170.3,
  })
  @IsOptional()
  @IsNumber()
  heightCm?: number;

  @ApiPropertyOptional({
    description: '체중(kg)',
    example: 69.1,
  })
  @IsOptional()
  @IsNumber()
  weightKg?: number;

  @ApiPropertyOptional({
    description: '골격근량(kg)',
    example: 31.5,
  })
  @IsOptional()
  @IsNumber()
  skeletalMuscleKg?: number;

  @ApiPropertyOptional({
    description: '체지방량(kg)',
    example: 14.3,
  })
  @IsOptional()
  @IsNumber()
  bodyFatKg?: number;

  @ApiPropertyOptional({
    description: '체지방률(%)',
    example: 20.7,
  })
  @IsOptional()
  @IsNumber()
  bodyFatPct?: number;
}
