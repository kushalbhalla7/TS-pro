import express, { Application, NextFunction, Response, Request } from 'express';
import IAppStart from './interfaces/app-start-interface';
import { config } from './config/config';
import { Logger } from '@utils/logger';
import cors from 'cors';
import path from 'path';
import { AppRoutes } from './routes';
import { dbCreateConnection } from '@connections/db-connection';
import { swaggerInit } from '@modules/swagger/swagger-controller';

class AppStart implements IAppStart {
  public app: Application;
  private readonly serverLogger: Logger;

  constructor() {
    this.app = express();
    this.serverLogger = new Logger();
    this.initalizeMiddleware();
  }

  listen(): void {
    this.app.listen(config.port, () => {
      this.serverLogger.info(`App listening on the port ${config.port}`);
    });
  }

  dbConnection(): Promise<void> {
    return dbCreateConnection();
  }

  initalizeMiddleware(): void {
    this.app.use(cors());
    this.app.use(express.json());

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'POST, GET, DELETE, PUT, OPTION'
      );
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Max-Age', '1800');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });

    this.app.use(express.static(path.join(__dirname, 'public')));
    this.initRoutes();
  }

  initRoutes(): void {
    this.app.use(AppRoutes.initAppRoutes());
    swaggerInit(this.app);
  }
}

export default AppStart;
