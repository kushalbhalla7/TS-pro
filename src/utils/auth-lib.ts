import bcrypt from 'bcrypt';

import { config } from '@config/config';

export const encodePassword = (password: string): string => {
  return bcrypt.hashSync(password, config.bcryptEncryption.saltRounds);
};

export const comparePassword = (
  savedPassword: string,
  passwordAttempt: string
): boolean => {
  return bcrypt.compareSync(passwordAttempt, savedPassword);
};
