import { ErrorResponse } from '@exceptions/error-response';
import { NextFunction, Request, Response } from 'express';
import { Logger } from './logger';
import LogConfig from 'src/interfaces/log-config-interface';

export class RequestValidator {
  static joiValidation(
    req: Request,
    res: Response,
    next: NextFunction,
    joinSchemaForSwagger: any,
    logConfig: LogConfig
  ) {
    const logger: Logger = new Logger(
      logConfig.moduleName,
      logConfig.errorFilePath,
      logConfig.activityFilePath
    );

    try {
      if (
        joinSchemaForSwagger.query &&
        Object.keys(joinSchemaForSwagger).length > 0
      ) {
        const response = joinSchemaForSwagger.query.validate(req.query);
        if (response && response.error) {
          throw response.error;
        }
      }

      if (
        joinSchemaForSwagger.body &&
        Object.keys(joinSchemaForSwagger).length > 0
      ) {
        const response = joinSchemaForSwagger.body.validate(req.body);
        if (response && response.error) {
          throw response.error;
        }
      }
      next();
    } catch (err: any) {
      const error: any = { ...new ErrorResponse().RequestValidationError };
      error.message = err.message;
      logger.error(JSON.stringify(error));
      res.status(400).json(error);
    }
  }
}
