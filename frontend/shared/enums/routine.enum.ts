export const PresetRoutineCode = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
  STRENGTH: 'STRENGTH',
  FAT_LOSS: 'FAT_LOSS',
  GIANT: 'GIANT',
} as const;

export type PresetRoutineType =
  | 'BEGINNER'
  | 'INTERMEDIATE'
  | 'ADVANCED'
  | 'STRENGTH'
  | 'FAT_LOSS'
  | 'GIANT';

export const BodyPartCode = {
  CHEST: 'CHEST',
  BACK: 'BACK',
  LEGS: 'LEGS',
  SHOULDERS: 'SHOULDERS',
  ARMS: 'ARMS',
  CORE: 'CORE',
  FULL_BODY: 'FULL_BODY',
} as const;

export type BodyPartType =
  | 'CHEST'
  | 'BACK'
  | 'LEGS'
  | 'SHOULDERS'
  | 'ARMS'
  | 'CORE'
  | 'FULL_BODY';

export const BodyPartLabel: Record<
  (typeof BodyPartCode)[keyof typeof BodyPartCode],
  string
> = {
  CHEST: '가슴',
  BACK: '등',
  LEGS: '하체',
  SHOULDERS: '어깨',
  ARMS: '팔',
  CORE: '코어',
  FULL_BODY: '전신',
};
