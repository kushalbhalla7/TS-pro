import { RequestValidator } from '@utils/validator';
import { NextFunction, Request, Response } from 'express';
import { JOI_SCHEMA_OBJECT_FOR_REGISTER } from './user-constant';
import { logConfig } from './user-constant';

export class UserValidator {
  static async register(req: Request, res: Response, next: NextFunction) {
    RequestValidator.joiValidation(
      req,
      res,
      next,
      JOI_SCHEMA_OBJECT_FOR_REGISTER,
      logConfig
    );
  }
}
