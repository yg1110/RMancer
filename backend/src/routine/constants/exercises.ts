import { ExperienceLevel, OneRmLift } from '@prisma/client';

export type SlotType = 'MAIN' | 'ASSIST' | 'ACC';
export type MovementPattern =
  | 'SQUAT'
  | 'HINGE'
  | 'H_PUSH'
  | 'V_PUSH'
  | 'H_PULL'
  | 'V_PULL'
  | 'ARMS'
  | 'CORE'
  | 'CALVES';

export type ExerciseDef = {
  key: string;
  name: string;
  anchorLift: OneRmLift;
  pattern: MovementPattern;
  minLevel: ExperienceLevel;
};

export const EXERCISES: readonly ExerciseDef[] = [
  {
    key: 'back_squat',
    name: '백 스쿼트',
    anchorLift: 'BACK_SQUAT',
    pattern: 'SQUAT',
    minLevel: 'BEGINNER',
  },
  {
    key: 'bench_press',
    name: '벤치프레스',
    anchorLift: 'BENCH_PRESS',
    pattern: 'H_PUSH',
    minLevel: 'BEGINNER',
  },
  {
    key: 'deadlift',
    name: '컨벤셔널 데드리프트',
    anchorLift: 'DEADLIFT',
    pattern: 'HINGE',
    minLevel: 'BEGINNER',
  },
  {
    key: 'overhead_press',
    name: '오버헤드 프레스',
    anchorLift: 'OVERHEAD_PRESS',
    pattern: 'V_PUSH',
    minLevel: 'BEGINNER',
  },

  {
    key: 'front_squat',
    name: '프론트 스쿼트',
    anchorLift: 'BACK_SQUAT',
    pattern: 'SQUAT',
    minLevel: 'INTERMEDIATE',
  },
  {
    key: 'pause_squat',
    name: '포즈 스쿼트',
    anchorLift: 'BACK_SQUAT',
    pattern: 'SQUAT',
    minLevel: 'INTERMEDIATE',
  },
  {
    key: 'incline_bench',
    name: '인클라인 벤치프레스',
    anchorLift: 'BENCH_PRESS',
    pattern: 'H_PUSH',
    minLevel: 'INTERMEDIATE',
  },
  {
    key: 'close_grip_bench',
    name: '클로즈그립 벤치프레스',
    anchorLift: 'BENCH_PRESS',
    pattern: 'H_PUSH',
    minLevel: 'INTERMEDIATE',
  },
  {
    key: 'sumo_deadlift',
    name: '스모 데드리프트',
    anchorLift: 'DEADLIFT',
    pattern: 'HINGE',
    minLevel: 'INTERMEDIATE',
  },
  {
    key: 'paused_deadlift',
    name: '포즈 데드리프트',
    anchorLift: 'DEADLIFT',
    pattern: 'HINGE',
    minLevel: 'ADVANCED',
  },
  {
    key: 'push_press',
    name: '푸시프레스',
    anchorLift: 'OVERHEAD_PRESS',
    pattern: 'V_PUSH',
    minLevel: 'ADVANCED',
  },

  // SQUAT anchor (하체-쿼드 중심)
  {
    key: 'leg_press',
    name: '레그프레스',
    anchorLift: 'BACK_SQUAT',
    pattern: 'SQUAT',
    minLevel: 'BEGINNER',
  },
  {
    key: 'hack_squat',
    name: '핵 스쿼트',
    anchorLift: 'BACK_SQUAT',
    pattern: 'SQUAT',
    minLevel: 'INTERMEDIATE',
  },
  {
    key: 'goblet_squat',
    name: '고블렛 스쿼트',
    anchorLift: 'BACK_SQUAT',
    pattern: 'SQUAT',
    minLevel: 'BEGINNER',
  },
  {
    key: 'bulgarian_split_squat',
    name: '불가리안 스플릿 스쿼트',
    anchorLift: 'BACK_SQUAT',
    pattern: 'SQUAT',
    minLevel: 'BEGINNER',
  },
  {
    key: 'walking_lunge',
    name: '워킹 런지',
    anchorLift: 'BACK_SQUAT',
    pattern: 'SQUAT',
    minLevel: 'BEGINNER',
  },
  {
    key: 'leg_extension',
    name: '레그 익스텐션',
    anchorLift: 'BACK_SQUAT',
    pattern: 'SQUAT',
    minLevel: 'BEGINNER',
  },

  // DEADLIFT anchor (힌지/등/햄스트링/둔근)
  {
    key: 'romanian_deadlift',
    name: '루마니안 데드리프트(RDL)',
    anchorLift: 'DEADLIFT',
    pattern: 'HINGE',
    minLevel: 'BEGINNER',
  },
  {
    key: 'stiff_leg_deadlift',
    name: '스티프레그 데드리프트',
    anchorLift: 'DEADLIFT',
    pattern: 'HINGE',
    minLevel: 'INTERMEDIATE',
  },
  {
    key: 'hip_thrust',
    name: '힙 쓰러스트',
    anchorLift: 'DEADLIFT',
    pattern: 'HINGE',
    minLevel: 'BEGINNER',
  },
  {
    key: 'good_morning',
    name: '굿모닝',
    anchorLift: 'DEADLIFT',
    pattern: 'HINGE',
    minLevel: 'ADVANCED',
  },
  {
    key: 'leg_curl',
    name: '레그 컬',
    anchorLift: 'DEADLIFT',
    pattern: 'HINGE',
    minLevel: 'BEGINNER',
  },
  {
    key: 'back_extension',
    name: '백 익스텐션',
    anchorLift: 'DEADLIFT',
    pattern: 'HINGE',
    minLevel: 'BEGINNER',
  },

  // DEADLIFT anchor (등: 로우/풀)
  {
    key: 'barbell_row',
    name: '바벨 로우',
    anchorLift: 'DEADLIFT',
    pattern: 'H_PULL',
    minLevel: 'INTERMEDIATE',
  },
  {
    key: 'chest_supported_row',
    name: '체스트 서포티드 로우',
    anchorLift: 'DEADLIFT',
    pattern: 'H_PULL',
    minLevel: 'BEGINNER',
  },
  {
    key: 'seated_cable_row',
    name: '시티드 케이블 로우',
    anchorLift: 'DEADLIFT',
    pattern: 'H_PULL',
    minLevel: 'BEGINNER',
  },
  {
    key: 'one_arm_db_row',
    name: '원암 덤벨 로우',
    anchorLift: 'DEADLIFT',
    pattern: 'H_PULL',
    minLevel: 'BEGINNER',
  },
  {
    key: 'lat_pulldown',
    name: '랫 풀다운',
    anchorLift: 'DEADLIFT',
    pattern: 'V_PULL',
    minLevel: 'BEGINNER',
  },
  {
    key: 'pull_up',
    name: '풀업',
    anchorLift: 'DEADLIFT',
    pattern: 'V_PULL',
    minLevel: 'INTERMEDIATE',
  },
  {
    key: 'face_pull',
    name: '페이스 풀',
    anchorLift: 'DEADLIFT',
    pattern: 'H_PULL',
    minLevel: 'BEGINNER',
  },

  // BENCH anchor (가슴/수평 푸시 + 삼두)
  {
    key: 'db_bench_press',
    name: '덤벨 벤치프레스',
    anchorLift: 'BENCH_PRESS',
    pattern: 'H_PUSH',
    minLevel: 'BEGINNER',
  },
  {
    key: 'incline_db_press',
    name: '인클라인 덤벨프레스',
    anchorLift: 'BENCH_PRESS',
    pattern: 'H_PUSH',
    minLevel: 'BEGINNER',
  },
  {
    key: 'chest_press_machine',
    name: '체스트 프레스 머신',
    anchorLift: 'BENCH_PRESS',
    pattern: 'H_PUSH',
    minLevel: 'BEGINNER',
  },
  {
    key: 'cable_fly',
    name: '케이블 플라이',
    anchorLift: 'BENCH_PRESS',
    pattern: 'H_PUSH',
    minLevel: 'BEGINNER',
  },
  {
    key: 'push_up',
    name: '푸쉬업',
    anchorLift: 'BENCH_PRESS',
    pattern: 'H_PUSH',
    minLevel: 'BEGINNER',
  },
  {
    key: 'triceps_pushdown',
    name: '트라이셉스 푸시다운',
    anchorLift: 'BENCH_PRESS',
    pattern: 'ARMS',
    minLevel: 'BEGINNER',
  },
  {
    key: 'skull_crusher',
    name: '스컬크러셔',
    anchorLift: 'BENCH_PRESS',
    pattern: 'ARMS',
    minLevel: 'INTERMEDIATE',
  },

  // OHP anchor (어깨/수직 푸시)
  {
    key: 'seated_db_shoulder_press',
    name: '시티드 덤벨 숄더프레스',
    anchorLift: 'OVERHEAD_PRESS',
    pattern: 'V_PUSH',
    minLevel: 'BEGINNER',
  },
  {
    key: 'shoulder_press_machine',
    name: '숄더프레스 머신',
    anchorLift: 'OVERHEAD_PRESS',
    pattern: 'V_PUSH',
    minLevel: 'BEGINNER',
  },
  {
    key: 'lateral_raise',
    name: '사이드 레터럴 레이즈',
    anchorLift: 'OVERHEAD_PRESS',
    pattern: 'V_PUSH',
    minLevel: 'BEGINNER',
  },
  {
    key: 'rear_delt_fly',
    name: '리어델트 플라이',
    anchorLift: 'OVERHEAD_PRESS',
    pattern: 'H_PULL',
    minLevel: 'BEGINNER',
  },

  // Arms (anchor를 일관되게 push=BENCH, pull=DEAD로 고정)
  {
    key: 'db_curl',
    name: '덤벨 컬',
    anchorLift: 'DEADLIFT',
    pattern: 'ARMS',
    minLevel: 'BEGINNER',
  },
  {
    key: 'hammer_curl',
    name: '해머 컬',
    anchorLift: 'DEADLIFT',
    pattern: 'ARMS',
    minLevel: 'BEGINNER',
  },

  // Core / Calves (anchor는 DEAD/SQUAT로 단순화)
  {
    key: 'cable_crunch',
    name: '케이블 크런치',
    anchorLift: 'DEADLIFT',
    pattern: 'CORE',
    minLevel: 'BEGINNER',
  },
  {
    key: 'hanging_leg_raise',
    name: '행잉 레그레이즈',
    anchorLift: 'DEADLIFT',
    pattern: 'CORE',
    minLevel: 'INTERMEDIATE',
  },
  {
    key: 'plank',
    name: '플랭크',
    anchorLift: 'DEADLIFT',
    pattern: 'CORE',
    minLevel: 'BEGINNER',
  },
  {
    key: 'standing_calf_raise',
    name: '스탠딩 카프 레이즈',
    anchorLift: 'BACK_SQUAT',
    pattern: 'CALVES',
    minLevel: 'BEGINNER',
  },
  {
    key: 'seated_calf_raise',
    name: '시티드 카프 레이즈',
    anchorLift: 'BACK_SQUAT',
    pattern: 'CALVES',
    minLevel: 'BEGINNER',
  },
] as const;
