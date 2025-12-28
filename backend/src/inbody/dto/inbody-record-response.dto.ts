import { ApiProperty } from '@nestjs/swagger';

export class InbodyRecordResponseDto {
  @ApiProperty({
    description: '인바디 기록 ID',
    example: 'clxxx123456789',
  })
  id: string;

  @ApiProperty({
    description: '사용자 ID',
    example: 'clxxx987654321',
  })
  userId: string;

  @ApiProperty({
    description: '측정일/입력 기준일',
    example: '2025-12-28T00:00:00.000Z',
  })
  measuredAt: Date;

  @ApiProperty({
    description: '키(cm)',
    example: 170.3,
  })
  heightCm: number;

  @ApiProperty({
    description: '체중(kg)',
    example: 69.1,
  })
  weightKg: number;

  @ApiProperty({
    description: '골격근량(kg)',
    example: 31.5,
  })
  skeletalMuscleKg: number;

  @ApiProperty({
    description: '체지방량(kg)',
    example: 14.3,
  })
  bodyFatKg: number;

  @ApiProperty({
    description: '체지방률(%)',
    example: 20.7,
  })
  bodyFatPct: number;

  @ApiProperty({
    description: '생성일시',
    example: '2025-12-28T00:00:00.000Z',
  })
  createdAt: Date;
}
