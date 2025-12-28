import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RoutineLogResponseDto {
  @ApiProperty({
    description: '루틴 로그 ID',
    example: 'clxxx123456789',
  })
  id: string;

  @ApiProperty({
    description: '루틴 일차 ID',
    example: 'clxxx987654321',
  })
  routineDayId: string;

  @ApiProperty({
    description: '수행 날짜',
    example: '2024-01-15T00:00:00.000Z',
  })
  date: Date;

  @ApiProperty({
    description: '완료 여부',
    example: true,
  })
  isCompleted: boolean;

  @ApiPropertyOptional({
    description: '완료 시각',
    example: '2024-01-15T10:30:00.000Z',
  })
  completedAt: Date | null;
}

