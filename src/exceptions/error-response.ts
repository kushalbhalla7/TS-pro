import { httpStatusCode } from 'src/constants/http-status-code';
import { IErrorCode } from 'src/interfaces/error-objects';

export class ErrorResponse {
  public BadRequest: IErrorCode = {
    httpStatusCode: httpStatusCode.BadRequest,
    message: 'Bad Request',
    serverCode: 'PRO_ERR_400',
  };

  public RequestValidationError: IErrorCode = {
    httpStatusCode: httpStatusCode.BadRequest,
    message: 'Invalid Request',
    serverCode: 'PRO_ERR_112',
  };

  public UserEmailAlreadyExist: IErrorCode = {
    message: 'User already exists with this email',
    serverCode: 'PRO_ERR_101',
    httpStatusCode: httpStatusCode.ResourceAlreadyExists,
  };

  public UserPhoneAlreadyExist: IErrorCode = {
    message: 'User already exists with this phone number.',
    serverCode: 'KTO_ERR_100',
    httpStatusCode: httpStatusCode.ResourceAlreadyExists,
  };

  public ACCESS_TOKEN_EXPIRE: IErrorCode = {
    httpStatusCode: httpStatusCode.UnAuthorized,
    message: 'Access token expire',
    serverCode: 'KTO_ERR_115',
  };
}
