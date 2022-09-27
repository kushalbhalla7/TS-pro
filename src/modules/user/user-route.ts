import { Router } from 'express';
import UserController from './user-controller';
import { UserValidator } from './user-validator';

export function userRoutesInit(): Router {
  const router: Router = Router();

  router.post('/register', UserValidator.register, UserController.register);

  return router;
}
