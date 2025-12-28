import { IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInbodyRecordDto {
  @ApiProperty({
    description: '측정일/입력 기준일 (정렬/최신 조회의 기준)',
    example: '2024-01-15T00:00:00.000Z',
  })
  @IsDateString()
  measuredAt: string;

  @ApiProperty({
    description: '키(cm)',
    example: 170.3,
  })
  @IsNumber()
  heightCm: number;

  @ApiProperty({
    description: '체중(kg)',
    example: 69.1,
  })
  @IsNumber()
  weightKg: number;

  @ApiProperty({
    description: '골격근량(kg)',
    example: 31.5,
  })
  @IsNumber()
  skeletalMuscleKg: number;

  @ApiProperty({
    description: '체지방량(kg)',
    example: 14.3,
  })
  @IsNumber()
  bodyFatKg: number;

  @ApiProperty({
    description: '체지방률(%)',
    example: 20.7,
  })
  @IsNumber()
  bodyFatPct: number;
}
