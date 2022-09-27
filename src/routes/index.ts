import { Router } from 'express';
import { routesVersion } from './route-constant';
import RoutingVersion from './v1';

export class AppRoutes {
  static initAppRoutes(): Router {
    return RoutingVersion.versionOne(routesVersion.V1);
  }
}
