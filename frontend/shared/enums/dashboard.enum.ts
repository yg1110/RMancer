export const ExperienceLevelCode = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
} as const;

export const GoalTypeCode = {
  MUSCLE_GAIN: 'MUSCLE_GAIN',
  FAT_LOSS: 'FAT_LOSS',
} as const;

export const ExperienceLevelLabel: Record<
  (typeof ExperienceLevelCode)[keyof typeof ExperienceLevelCode],
  string
> = {
  BEGINNER: '입문자',
  INTERMEDIATE: '중급자',
  ADVANCED: '상급자',
} as const;
export const ExperienceLevelDescription: Record<
  (typeof ExperienceLevelCode)[keyof typeof ExperienceLevelCode],
  string
> = {
  BEGINNER: '1년 미만 또는 처음 시작',
  INTERMEDIATE: '1~3년의 꾸준한 경험',
  ADVANCED: '3년 이상 고숙련자',
} as const;
export const GoalTypeLabel: Record<
  (typeof GoalTypeCode)[keyof typeof GoalTypeCode],
  string
> = {
  MUSCLE_GAIN: '근육 성장',
  FAT_LOSS: '체지방 감소',
} as const;

export type ExperienceLevel =
  (typeof ExperienceLevelCode)[keyof typeof ExperienceLevelCode];
export type GoalType = (typeof GoalTypeCode)[keyof typeof GoalTypeCode];
