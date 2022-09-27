import { userSwaggerRoutes } from '@modules/user/user-swagger';
import { IAppRoute } from './swagger-schema-interface';

const swaggerAppRoutes = (): IAppRoute[] => {
  return [...userSwaggerRoutes()];
};

export default swaggerAppRoutes;
