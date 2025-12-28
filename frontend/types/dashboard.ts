import {
  GoalProfileResponseDto,
  InbodyRecordResponseDto,
  OneRmRecordResponseDto,
} from '@/generated/openapi-client';

export type ExperienceLevelData = GoalProfileResponseDto['experienceLevel'];
export type GoalTypeData = GoalProfileResponseDto['goalType'];
export type InBodyData = {
  heightCm: InbodyRecordResponseDto['heightCm'];
  weightKg: InbodyRecordResponseDto['weightKg'];
  skeletalMuscleKg: InbodyRecordResponseDto['skeletalMuscleKg'];
  bodyFatKg: InbodyRecordResponseDto['bodyFatKg'];
  bodyFatPct: InbodyRecordResponseDto['bodyFatPct'];
};
export type OneRMData = {
  squat: OneRmRecordResponseDto['oneRmKg'];
  benchPress: OneRmRecordResponseDto['oneRmKg'];
  deadlift: OneRmRecordResponseDto['oneRmKg'];
  overheadPress: OneRmRecordResponseDto['oneRmKg'];
};
