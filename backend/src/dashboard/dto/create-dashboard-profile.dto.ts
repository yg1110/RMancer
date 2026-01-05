import {
  IsArray,
  ValidateNested,
  IsEnum,
  IsInt,
  Min,
  Max,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GoalType, ExperienceLevel, OneRmLift } from '@prisma/client';

class GoalProfileDataDto {
  @ApiProperty({
    description: '목표 타입 (근비대/감량)',
    enum: GoalType,
    example: 'FAT_LOSS',
  })
  @IsEnum(GoalType)
  goalType: GoalType;

  @ApiProperty({
    description: '운동 경험치',
    enum: ExperienceLevel,
    example: 'INTERMEDIATE',
  })
  @IsEnum(ExperienceLevel)
  experienceLevel: ExperienceLevel;

  @ApiProperty({
    description: '주당 운동 횟수 (3~6 권장)',
    example: 6,
    minimum: 3,
    maximum: 6,
  })
  @IsInt()
  @Min(3)
  @Max(6)
  weeklyFrequency: number;
}

class InbodyRecordDataDto {
  @ApiProperty({
    description: '측정일/입력 기준일',
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

class OneRmRecordDataDto {
  @ApiProperty({
    description: '운동 종류',
    enum: OneRmLift,
    example: OneRmLift.BENCH_PRESS,
  })
  @IsEnum(OneRmLift)
  lift: OneRmLift;

  @ApiProperty({
    description: '1RM 무게(kg)',
    example: 100.5,
  })
  @IsNumber()
  oneRmKg: number;
}

export class CreateDashboardProfileDto {
  @ApiProperty({
    description: '목표 프로필 정보',
    type: GoalProfileDataDto,
  })
  @ValidateNested()
  @Type(() => GoalProfileDataDto)
  goalProfile: GoalProfileDataDto;

  @ApiProperty({
    description: '인바디 기록 정보',
    type: InbodyRecordDataDto,
  })
  @ValidateNested()
  @Type(() => InbodyRecordDataDto)
  inbodyRecord: InbodyRecordDataDto;

  @ApiProperty({
    description: '1RM 기록 목록',
    type: [OneRmRecordDataDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OneRmRecordDataDto)
  oneRmRecords: OneRmRecordDataDto[];
}
