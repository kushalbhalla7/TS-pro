import { Router } from 'express';
import { userRoutesInit } from 'src/modules/user/user-route';

export default class RoutingVersion {
  static versionOne(prefix: string): Router {
    const router: Router = Router();
    const userRoutes: Router = userRoutesInit();

    router.use(`${prefix}/api/user`, userRoutes);

    return router;
  }
}
