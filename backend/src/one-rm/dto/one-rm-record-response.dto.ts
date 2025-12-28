import { ApiProperty } from '@nestjs/swagger';
import { OneRmLift } from '@prisma/client';

export class OneRmRecordResponseDto {
  @ApiProperty({
    description: '1RM 기록 ID',
    example: 'clxxx123456789',
  })
  id: string;

  @ApiProperty({
    description: '사용자 ID',
    example: 'clxxx987654321',
  })
  userId: string;

  @ApiProperty({
    description: '운동 종류',
    enum: OneRmLift,
    example: OneRmLift.BENCH_PRESS,
  })
  lift: OneRmLift;

  @ApiProperty({
    description: '1RM 무게(kg)',
    example: 100.5,
  })
  oneRmKg: number;

  @ApiProperty({
    description: '측정일/입력 기준일',
    example: '2025-12-28T00:00:00.000Z',
  })
  measuredAt: Date;

  @ApiProperty({
    description: '생성일시',
    example: '2025-12-28T00:00:00.000Z',
  })
  createdAt: Date;
}

