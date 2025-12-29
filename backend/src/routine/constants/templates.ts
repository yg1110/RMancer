import { OneRmLift } from '@prisma/client';
import { SlotType, MovementPattern } from './exercises';

/**
 * Split 템플릿: frequency(주당 횟수) -> DayTemplate[]
 * - 각 day는 SlotTemplate[] 로 구성
 * - SlotTemplate에 anchorLift/패턴/slotType을 명시해두면, Catalog에서 자동 선택 가능
 */
export type SlotTemplate = {
  slotType: SlotType;
  /** %1RM 기준이 되는 리프트 */
  anchorLift: OneRmLift;
  /** 카탈로그 필터용 */
  pattern: MovementPattern;
  /** 후보를 좁히고 싶으면 key를 직접 지정 */
  pickKeys?: readonly string[];
};

export type DayTemplate = {
  name: string;
  slots: readonly SlotTemplate[];
};

export type SplitTemplates = Record<3 | 4 | 5 | 6, readonly DayTemplate[]>;

export const SPLIT_TEMPLATES: SplitTemplates = {
  3: [
    {
      name: 'Full Body A',
      slots: [
        {
          slotType: 'MAIN',
          anchorLift: 'BACK_SQUAT',
          pattern: 'SQUAT',
          pickKeys: ['back_squat'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'BENCH_PRESS',
          pattern: 'H_PUSH',
          pickKeys: ['bench_press', 'db_bench_press'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'DEADLIFT',
          pattern: 'H_PULL',
          pickKeys: [
            'seated_cable_row',
            'chest_supported_row',
            'one_arm_db_row',
          ],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'V_PULL',
          pickKeys: ['lat_pulldown'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'CORE',
          pickKeys: ['plank', 'cable_crunch'],
        },
      ],
    },
    {
      name: 'Full Body B',
      slots: [
        {
          slotType: 'MAIN',
          anchorLift: 'DEADLIFT',
          pattern: 'HINGE',
          pickKeys: ['deadlift'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'OVERHEAD_PRESS',
          pattern: 'V_PUSH',
          pickKeys: ['overhead_press', 'shoulder_press_machine'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'BACK_SQUAT',
          pattern: 'SQUAT',
          pickKeys: ['leg_press', 'goblet_squat'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'BENCH_PRESS',
          pattern: 'ARMS',
          pickKeys: ['triceps_pushdown'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'ARMS',
          pickKeys: ['db_curl', 'hammer_curl'],
        },
      ],
    },
    {
      name: 'Full Body C',
      slots: [
        {
          slotType: 'MAIN',
          anchorLift: 'BENCH_PRESS',
          pattern: 'H_PUSH',
          pickKeys: ['bench_press'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'BACK_SQUAT',
          pattern: 'SQUAT',
          pickKeys: ['front_squat', 'bulgarian_split_squat', 'walking_lunge'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'DEADLIFT',
          pattern: 'V_PULL',
          pickKeys: ['lat_pulldown', 'pull_up'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'OVERHEAD_PRESS',
          pattern: 'V_PUSH',
          pickKeys: ['lateral_raise'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'HINGE',
          pickKeys: ['leg_curl', 'back_extension'],
        },
      ],
    },
  ],

  4: [
    {
      name: 'Upper A',
      slots: [
        {
          slotType: 'MAIN',
          anchorLift: 'BENCH_PRESS',
          pattern: 'H_PUSH',
          pickKeys: ['bench_press'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'DEADLIFT',
          pattern: 'H_PULL',
          pickKeys: ['seated_cable_row', 'chest_supported_row'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'OVERHEAD_PRESS',
          pattern: 'V_PUSH',
          pickKeys: ['overhead_press', 'seated_db_shoulder_press'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'V_PULL',
          pickKeys: ['lat_pulldown'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'BENCH_PRESS',
          pattern: 'ARMS',
          pickKeys: ['triceps_pushdown'],
        },
      ],
    },
    {
      name: 'Lower A',
      slots: [
        {
          slotType: 'MAIN',
          anchorLift: 'BACK_SQUAT',
          pattern: 'SQUAT',
          pickKeys: ['back_squat'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'DEADLIFT',
          pattern: 'HINGE',
          pickKeys: ['romanian_deadlift', 'hip_thrust'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'BACK_SQUAT',
          pattern: 'SQUAT',
          pickKeys: ['leg_press', 'leg_extension'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'HINGE',
          pickKeys: ['leg_curl', 'back_extension'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'CORE',
          pickKeys: ['cable_crunch', 'plank'],
        },
      ],
    },
    {
      name: 'Upper B',
      slots: [
        {
          slotType: 'MAIN',
          anchorLift: 'OVERHEAD_PRESS',
          pattern: 'V_PUSH',
          pickKeys: ['overhead_press'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'BENCH_PRESS',
          pattern: 'H_PUSH',
          pickKeys: ['incline_bench', 'db_bench_press', 'incline_db_press'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'DEADLIFT',
          pattern: 'V_PULL',
          pickKeys: ['pull_up', 'lat_pulldown'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'OVERHEAD_PRESS',
          pattern: 'V_PUSH',
          pickKeys: ['lateral_raise', 'rear_delt_fly'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'ARMS',
          pickKeys: ['db_curl', 'hammer_curl'],
        },
      ],
    },
    {
      name: 'Lower B',
      slots: [
        {
          slotType: 'MAIN',
          anchorLift: 'DEADLIFT',
          pattern: 'HINGE',
          pickKeys: ['deadlift', 'sumo_deadlift'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'BACK_SQUAT',
          pattern: 'SQUAT',
          pickKeys: ['front_squat', 'pause_squat', 'bulgarian_split_squat'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'HINGE',
          pickKeys: ['hip_thrust', 'leg_curl'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'BACK_SQUAT',
          pattern: 'CALVES',
          pickKeys: ['standing_calf_raise', 'seated_calf_raise'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'CORE',
          pickKeys: ['plank', 'hanging_leg_raise'],
        },
      ],
    },
  ],

  5: [
    {
      name: 'Push',
      slots: [
        {
          slotType: 'MAIN',
          anchorLift: 'BENCH_PRESS',
          pattern: 'H_PUSH',
          pickKeys: ['bench_press'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'OVERHEAD_PRESS',
          pattern: 'V_PUSH',
          pickKeys: ['overhead_press', 'seated_db_shoulder_press'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'BENCH_PRESS',
          pattern: 'H_PUSH',
          pickKeys: ['incline_db_press', 'cable_fly', 'chest_press_machine'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'OVERHEAD_PRESS',
          pattern: 'V_PUSH',
          pickKeys: ['lateral_raise'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'BENCH_PRESS',
          pattern: 'ARMS',
          pickKeys: ['triceps_pushdown', 'skull_crusher'],
        },
      ],
    },
    {
      name: 'Pull',
      slots: [
        {
          slotType: 'MAIN',
          anchorLift: 'DEADLIFT',
          pattern: 'H_PULL',
          pickKeys: ['barbell_row', 'chest_supported_row'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'DEADLIFT',
          pattern: 'V_PULL',
          pickKeys: ['pull_up', 'lat_pulldown'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'H_PULL',
          pickKeys: ['seated_cable_row', 'face_pull'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'ARMS',
          pickKeys: ['db_curl', 'hammer_curl'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'CORE',
          pickKeys: ['cable_crunch'],
        },
      ],
    },
    {
      name: 'Legs',
      slots: [
        {
          slotType: 'MAIN',
          anchorLift: 'BACK_SQUAT',
          pattern: 'SQUAT',
          pickKeys: ['back_squat'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'DEADLIFT',
          pattern: 'HINGE',
          pickKeys: ['romanian_deadlift'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'BACK_SQUAT',
          pattern: 'SQUAT',
          pickKeys: ['leg_press', 'walking_lunge'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'HINGE',
          pickKeys: ['leg_curl', 'hip_thrust'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'BACK_SQUAT',
          pattern: 'CALVES',
          pickKeys: ['standing_calf_raise'],
        },
      ],
    },
    {
      name: 'Upper (hypertrophy)',
      slots: [
        {
          slotType: 'ASSIST',
          anchorLift: 'BENCH_PRESS',
          pattern: 'H_PUSH',
          pickKeys: ['incline_bench', 'db_bench_press'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'DEADLIFT',
          pattern: 'H_PULL',
          pickKeys: ['seated_cable_row', 'one_arm_db_row'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'V_PULL',
          pickKeys: ['lat_pulldown'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'OVERHEAD_PRESS',
          pattern: 'V_PUSH',
          pickKeys: ['lateral_raise', 'rear_delt_fly'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'BENCH_PRESS',
          pattern: 'ARMS',
          pickKeys: ['triceps_pushdown'],
        },
      ],
    },
    {
      name: 'Lower (hinge focus)',
      slots: [
        {
          slotType: 'MAIN',
          anchorLift: 'DEADLIFT',
          pattern: 'HINGE',
          pickKeys: ['deadlift', 'sumo_deadlift'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'BACK_SQUAT',
          pattern: 'SQUAT',
          pickKeys: ['front_squat', 'leg_press'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'HINGE',
          pickKeys: ['hip_thrust', 'back_extension'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'BACK_SQUAT',
          pattern: 'SQUAT',
          pickKeys: ['leg_extension'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'CORE',
          pickKeys: ['plank'],
        },
      ],
    },
  ],

  6: [
    // PPL x2 (ADVANCED 중심). 초/중급은 4~5회를 권장.
    {
      name: 'Push A',
      slots: [
        {
          slotType: 'MAIN',
          anchorLift: 'BENCH_PRESS',
          pattern: 'H_PUSH',
          pickKeys: ['bench_press'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'OVERHEAD_PRESS',
          pattern: 'V_PUSH',
          pickKeys: ['seated_db_shoulder_press'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'BENCH_PRESS',
          pattern: 'H_PUSH',
          pickKeys: ['cable_fly', 'incline_db_press'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'OVERHEAD_PRESS',
          pattern: 'V_PUSH',
          pickKeys: ['lateral_raise'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'BENCH_PRESS',
          pattern: 'ARMS',
          pickKeys: ['triceps_pushdown'],
        },
      ],
    },
    {
      name: 'Pull A',
      slots: [
        {
          slotType: 'MAIN',
          anchorLift: 'DEADLIFT',
          pattern: 'H_PULL',
          pickKeys: ['barbell_row', 'chest_supported_row'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'DEADLIFT',
          pattern: 'V_PULL',
          pickKeys: ['pull_up', 'lat_pulldown'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'H_PULL',
          pickKeys: ['seated_cable_row', 'face_pull'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'ARMS',
          pickKeys: ['db_curl'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'CORE',
          pickKeys: ['cable_crunch'],
        },
      ],
    },
    {
      name: 'Legs A',
      slots: [
        {
          slotType: 'MAIN',
          anchorLift: 'BACK_SQUAT',
          pattern: 'SQUAT',
          pickKeys: ['back_squat'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'DEADLIFT',
          pattern: 'HINGE',
          pickKeys: ['romanian_deadlift'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'BACK_SQUAT',
          pattern: 'SQUAT',
          pickKeys: ['leg_press'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'HINGE',
          pickKeys: ['leg_curl'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'BACK_SQUAT',
          pattern: 'CALVES',
          pickKeys: ['standing_calf_raise'],
        },
      ],
    },
    {
      name: 'Push B',
      slots: [
        {
          slotType: 'MAIN',
          anchorLift: 'OVERHEAD_PRESS',
          pattern: 'V_PUSH',
          pickKeys: ['overhead_press'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'BENCH_PRESS',
          pattern: 'H_PUSH',
          pickKeys: ['incline_bench', 'db_bench_press'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'BENCH_PRESS',
          pattern: 'H_PUSH',
          pickKeys: ['chest_press_machine', 'push_up'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'OVERHEAD_PRESS',
          pattern: 'V_PUSH',
          pickKeys: ['rear_delt_fly', 'lateral_raise'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'BENCH_PRESS',
          pattern: 'ARMS',
          pickKeys: ['skull_crusher', 'triceps_pushdown'],
        },
      ],
    },
    {
      name: 'Pull B',
      slots: [
        {
          slotType: 'ASSIST',
          anchorLift: 'DEADLIFT',
          pattern: 'V_PULL',
          pickKeys: ['pull_up', 'lat_pulldown'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'DEADLIFT',
          pattern: 'H_PULL',
          pickKeys: ['one_arm_db_row', 'seated_cable_row'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'H_PULL',
          pickKeys: ['face_pull'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'ARMS',
          pickKeys: ['hammer_curl'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'CORE',
          pickKeys: ['plank'],
        },
      ],
    },
    {
      name: 'Legs B (hinge heavy)',
      slots: [
        {
          slotType: 'MAIN',
          anchorLift: 'DEADLIFT',
          pattern: 'HINGE',
          pickKeys: ['deadlift', 'sumo_deadlift'],
        },
        {
          slotType: 'ASSIST',
          anchorLift: 'BACK_SQUAT',
          pattern: 'SQUAT',
          pickKeys: ['front_squat', 'pause_squat'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'DEADLIFT',
          pattern: 'HINGE',
          pickKeys: ['hip_thrust', 'back_extension'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'BACK_SQUAT',
          pattern: 'SQUAT',
          pickKeys: ['leg_extension', 'walking_lunge'],
        },
        {
          slotType: 'ACC',
          anchorLift: 'BACK_SQUAT',
          pattern: 'CALVES',
          pickKeys: ['seated_calf_raise'],
        },
      ],
    },
  ],
} as const;
