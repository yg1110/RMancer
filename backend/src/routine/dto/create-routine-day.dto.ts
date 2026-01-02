import {
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BodyPart } from '@prisma/client';
import { CreateRoutineSubExerciseDto } from './create-routine-sub-exercise.dto';

export class CreateRoutineDayDto {
  @ApiProperty({
    description: '운동 일차 인덱스',
    example: 0,
  })
  @IsNumber()
  @Min(0)
  dayIndex: number;

  @ApiProperty({
    description: '운동 이름',
    example: '상체 운동',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: '운동 부위',
    enum: BodyPart,
    example: 'CHEST',
  })
  @IsOptional()
  bodyPart?: BodyPart;

  @ApiProperty({
    description: '운동 목록',
    type: [CreateRoutineSubExerciseDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRoutineSubExerciseDto)
  subExercises: CreateRoutineSubExerciseDto[];
}
