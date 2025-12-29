import { ApiProperty } from '@nestjs/swagger';
import { RoutineExerciseResponseDto } from './routine-exercise-response.dto';

export class RoutineDayResponseDto {
  @ApiProperty({
    description: '루틴 일차 ID',
    example: 'clxxx123456789',
  })
  id: string;

  @ApiProperty({
    description: '루틴 ID',
    example: 'clxxx987654321',
  })
  routineId: string;

  @ApiProperty({
    description: '주간 내 순서(0..weeklyFrequency-1)',
    example: 0,
  })
  dayIndex: number;

  @ApiProperty({
    description: 'Day 이름(예: "Upper A")',
    example: 'Upper A',
  })
  name: string;

  @ApiProperty({
    description: '운동 항목 목록',
    type: [RoutineExerciseResponseDto],
  })
  exercises: RoutineExerciseResponseDto[];
}
