import { config } from '@config/config';
import { Application } from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerAppRoutes from './routes-config';
import fs from 'fs';
import { Logger } from '@utils/logger';
import { IAppRoute } from './swagger-schema-interface';
import { Swagger } from './swagger-service';

export function swaggerInit(app: Application) {
  const swaggerOption = {
    swagger: '2.0',
    info: {
      title: 'Swagger KTO',
      version: '1.0.5',
      description:
        'This is a KTO server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).',
      contact: {
        name: 'Admin',
        email: 'yogesh@techalchemy.co',
      },
      license: {
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
      },
      termsOfService: 'http://swagger.io/terms/',
    },
    host: config.swagger_host,
    securityDefinitions: {
      authorization: {
        type: 'apikey',
        name: 'authorization',
        in: 'header',
      },
    },
    paths: {},
    definitions: {},
    consumes: ['application/json'],
    produces: ['application/json'],
  };
  const swaggerRoutes = swaggerAppRoutes();
  createSwaggerUIFORRoutes(swaggerRoutes, swaggerOption);
  let readSwaggerObject = readSwaggerData();
  readSwaggerObject = readSwaggerObject ? readSwaggerObject : swaggerOption;
  app.use('/api-docs', serve, setup(readSwaggerObject));
}

const createSwaggerUIFORRoutes = (routes: IAppRoute[], swaggerInfo: any) => {
  const swaggerDoc = Swagger.instance();
  swaggerDoc.createJsonDoc(swaggerInfo);
  routes.forEach((route: IAppRoute) => {
    swaggerDoc.addNewRoute(
      route.joiSchemaForSwagger,
      route.path,
      route.method.toLocaleLowerCase(),
      route.auth
    );
  });
};

const readSwaggerData = (): any => {
  const serverLogger: Logger = new Logger();
  try {
    const swaggerData = fs.readFileSync('src/public/swagger.json', 'utf-8');
    return JSON.parse(swaggerData);
  } catch (err: any) {
    serverLogger.error(err.message);
    return '';
  }
};
