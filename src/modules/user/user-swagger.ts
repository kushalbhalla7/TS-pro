import { COMMON_ERROR_SCHEMA } from '@modules/common/common.constants';
import { IAppRoute } from '@modules/swagger/swagger-schema-interface';
import {
  JOI_SCHEMA_OBJECT_FOR_REGISTER,
  USER_ROUTES,
  USER_SCHEMA,
} from './user-constant';

export const userSwaggerRoutes = (): IAppRoute[] => {
  return [
    {
      path: USER_ROUTES.register.path,
      method: USER_ROUTES.register.method,
      joiSchemaForSwagger: {
        body: JOI_SCHEMA_OBJECT_FOR_REGISTER,
        group: USER_ROUTES.group,
        description: USER_ROUTES.register.description,
        model: USER_ROUTES.register.model,
        responses: [
          {
            status: 200,
            description: 'Success',
            schema: USER_SCHEMA.register,
          },
          {
            status: 400,
            description: 'User alraedy exists',
            schema: COMMON_ERROR_SCHEMA,
          },
        ],
      },
    },
  ];
};
