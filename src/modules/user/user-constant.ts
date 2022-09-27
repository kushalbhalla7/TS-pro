import { COMMON_SUCCESS_OBJECT } from '@modules/common/common.constants';
import Joi from 'joi';

export const USER_ROUTES = {
  group: 'user',
  register: {
    path: 'v1/api/user/register',
    method: 'POST',
    description: 'Add a user with required details',
    model: 'User',
  },
};

export const logConfig = {
  moduleName: 'user',
  errorFilePath: 'logs/user-error.log',
  activityFilePath: 'logs/user-activity.log',
};

export const JOI_SCHEMA_OBJECT_FOR_REGISTER = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export const USER_SCHEMA = {
  register: {
    type: 'object',
    properties: {
      ...COMMON_SUCCESS_OBJECT,
      result: {
        type: 'object',
        properties: {
          accessToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
          },
        },
      },
    },
  },
};
