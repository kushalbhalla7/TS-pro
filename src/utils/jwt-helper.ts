import { config } from '@config/config';
import { message } from '@constants/message';
import { ErrorResponse } from '@exceptions/error-response';
import { Request, NextFunction, Response } from 'express';
import {
  JwtPayload,
  sign as JWTSign,
  SignOptions,
  verify as JWTVerify,
} from 'jsonwebtoken';

interface ExtendedRequest extends Request {
  user?: string | JwtPayload;
}

const error = new ErrorResponse();
export const signAccessToken = ({ userId }: { userId: string }): string => {
  const payload = {};
  const options: SignOptions = {
    expiresIn: '1h',
    audience: userId,
  };
  return JWTSign(payload, config.accessTokenSecret, options);
};

export const verifyJwtToken = (
  accessToken: string,
  secretKey: string
): string | JwtPayload => {
  let result;
  try {
    result = JWTVerify(accessToken, secretKey);
  } catch (err: any) {
    if (err.name === message.libError.jwtTokenExpire) {
      console.log(err);
    } else if (err.name === message.libError.jwtError) {
      throw error.ACCESS_TOKEN_EXPIRE;
    }
    throw err;
  }
  return result;
};

export const validateRequest = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const accessToken = req.get('Authorization') || '';
  req.user = verifyJwtToken(accessToken, config.accessTokenSecret);
  next();
};
