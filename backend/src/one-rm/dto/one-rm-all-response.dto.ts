import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class OneRmAllResponseDto {
  @ApiProperty({
    description: '벤치 프레스 1RM',
    example: 100,
  })
  @IsNumber()
  BENCH_PRESS: number;

  @ApiProperty({
    description: '스쿼트 1RM',
    example: 100,
  })
  @IsNumber()
  BACK_SQUAT: number;

  @ApiProperty({
    description: '데드립 1RM',
    example: 100,
  })
  @IsNumber()
  DEADLIFT: number;

  @ApiProperty({
    description: '오버헤드 프레스 1RM',
    example: 100,
  })
  @IsNumber()
  OVERHEAD_PRESS: number;
}
