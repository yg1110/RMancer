'use server';

import {
  goalProfileControllerCreate,
  inbodyControllerCreate,
  oneRmControllerCreate,
} from '@/generated/openapi-client';
import {
  CreateGoalProfileDto,
  CreateInbodyRecordDto,
  CreateOneRmRecordDto,
} from '@/generated/openapi-client/types.gen';

export const createGoalProfile = async (body: CreateGoalProfileDto) => {
  console.log('body', body);
  const { data, error } = await goalProfileControllerCreate({ body });
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
