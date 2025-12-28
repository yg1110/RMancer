import { IsDateString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoutineLogDto {
  @ApiProperty({
    description: '수행 날짜',
    example: '2024-01-15T00:00:00.000Z',
  })
  @IsDateString()
  date: string;

  @ApiPropertyOptional({
    description: '완료 여부',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}

