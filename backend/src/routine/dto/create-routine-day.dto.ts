import { IsString, IsInt, Min, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateRoutineExerciseDto } from './create-routine-exercise.dto';

export class CreateRoutineDayDto {
  @ApiProperty({
    description: '주간 내 순서(0..weeklyFrequency-1)',
    example: 0,
  })
  @IsInt()
  @Min(0)
  dayIndex: number;

  @ApiProperty({
    description: 'Day 이름(예: "Upper A")',
    example: 'Upper A',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '운동 항목 목록',
    type: [CreateRoutineExerciseDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRoutineExerciseDto)
  exercises: CreateRoutineExerciseDto[];
}
