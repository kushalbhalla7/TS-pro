import { IErrorCode } from 'src/interfaces/error-objects';

export class Exception {
  serverCode: string;
  httpStatusCode: number;
  message: string;

  constructor(errorCode: IErrorCode) {
    this.message = errorCode.message;
    this.serverCode = errorCode.serverCode;
    this.httpStatusCode = errorCode.httpStatusCode;
  }
}
