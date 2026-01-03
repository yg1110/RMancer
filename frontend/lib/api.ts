'use server';

import {
  dashboardControllerGetLatestData,
  goalProfileControllerCreate,
  goalProfileControllerUpdate,
  inbodyControllerCreate,
  oneRmControllerCreate,
  presetRoutineControllerCreateRecommendedRoutine,
  presetRoutineControllerGetAllPresetRoutines,
  routineControllerCreate,
  routineControllerGetLatestRoutine,
} from '@/generated/openapi-client';
import {
  CreateGoalProfileDto,
  CreateInbodyRecordDto,
  CreateOneRmRecordDto,
  CreateRoutineDto,
  UpdateGoalProfileDto,
} from '@/generated/openapi-client/types.gen';
import { PresetRoutineType } from '@/shared/enums/routine.enum';

export const createGoalProfile = async (body: CreateGoalProfileDto) => {
  const { data, error } = await goalProfileControllerCreate({ body });
  return { data, error };
};
export const updateGoalProfile = async (body: UpdateGoalProfileDto) => {
  const { data, error } = await goalProfileControllerUpdate({ body });
  return { data, error };
};
export const createInbodyRecord = async (body: CreateInbodyRecordDto) => {
  const { data, error } = await inbodyControllerCreate({ body });
  return { data, error };
};
export const createOneRmRecord = async (body: CreateOneRmRecordDto) => {
  const { data, error } = await oneRmControllerCreate({ body });
  return { data, error };
};
export const getDashboardData = async () => {
  const { data, error } = await dashboardControllerGetLatestData();
  return { data, error };
};
export const getLatestRoutine = async () => {
  const { data, error } = await routineControllerGetLatestRoutine();
  return { data, error };
};
export const getPresetRoutines = async () => {
  const { data, error } = await presetRoutineControllerGetAllPresetRoutines();
  return { data, error };
};
export const createRecommendedRoutine = async (
  presetRoutineType: PresetRoutineType,
) => {
  const { data, error } = await presetRoutineControllerCreateRecommendedRoutine(
    { path: { presetRoutineType } },
  );
  return { data, error };
};
