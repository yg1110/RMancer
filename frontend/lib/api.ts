'use server';

import {
  dashboardControllerGetLatestData,
  goalProfileControllerCreate,
  goalProfileControllerUpdate,
  inbodyControllerCreate,
  inbodyControllerUpdate,
  oneRmControllerCreate,
  routineControllerCreateRecommended,
  routineControllerGetLatestRoutine,
} from '@/generated/openapi-client';
import {
  CreateGoalProfileDto,
  CreateInbodyRecordDto,
  CreateOneRmRecordDto,
  UpdateGoalProfileDto,
  UpdateInbodyRecordDto,
} from '@/generated/openapi-client/types.gen';

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
export const createRecommendedRoutine = async () => {
  const { data, error } = await routineControllerCreateRecommended();
  return { data, error };
};
