import { httpStatusCode } from '@constants/http-status-code';
import { ErrorResponse } from 'src/exceptions/error-response';
import { encodePassword } from '@utils/auth-lib';
import { signAccessToken } from '@utils/jwt-helper';
import { Logger } from '@utils/logger';
import { Request, Response } from 'express';
import UserService from './user-service';
import { Exception } from '@exceptions/exception';
import { logConfig } from './user-constant';

class UserController {
  static async register(req: Request, res: Response): Promise<void> {
    const error: ErrorResponse = new ErrorResponse();
    const logger: Logger = new Logger(
      logConfig.moduleName,
      logConfig.errorFilePath,
      logConfig.activityFilePath
    );

    try {
      const userData = req.body;
      const userWithEmail = await UserService.getUserAuth({
        email: userData.email,
      });
      if (userWithEmail != null) {
        throw new Exception(error.UserEmailAlreadyExist);
      }
      userData.password = encodePassword(userData.password);
      const result = await UserService.saveUser(userData);
      const accessToken: string = signAccessToken({
        userId: result.id.toString(),
      });
      res.status(httpStatusCode.creates).json({ result: { accessToken } });
    } catch (error: any) {
      logger.error(JSON.stringify(error));
      res.status(error.httpStatusCode).json(error);
    }
  }
}

export default UserController;
