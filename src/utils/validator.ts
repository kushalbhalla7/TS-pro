import { ErrorResponse } from '@exceptions/error-response';
import { NextFunction, Request, Response } from 'express';

export class RequestValidator {
  static joiValidation(
    req: Request,
    res: Response,
    next: NextFunction,
    joiSchemaForSwagegr: any
  ) {
    try {
      if (
        joiSchemaForSwagegr.query &&
        Object.keys(joiSchemaForSwagegr).length > 0
      ) {
        const response = joiSchemaForSwagegr.query.validate(req.query);
        if (response && response.error) {
          throw response.error;
        }
      }

      if (
        joiSchemaForSwagegr.body &&
        Object.keys(joiSchemaForSwagegr).length > 0
      ) {
        const response = joiSchemaForSwagegr.body.validate(req.body);
        if (response && response.error) {
          throw response.error;
        }
      }
      next();
    } catch (err: any) {
      const error: any = { ...new ErrorResponse().RequestValidationError };
      error.message = err.message;
      res.status(400).json(error);
    }
  }
}
