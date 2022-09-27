import { IErrorCode } from 'src/interfaces/error-objects';
import { httpStatusCode } from '@constants/http-status-code';
import { Exception } from './exception';

export class BadRequest extends Exception implements IErrorCode {
  constructor(errorObject: IErrorCode) {
    errorObject.httpStatusCode = httpStatusCode.BadRequest;
    super(errorObject);
  }
}
