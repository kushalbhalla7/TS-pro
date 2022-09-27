export default interface IAppStart {
  listen(): void;
  dbConnection(): Promise<void>;
  initalizeMiddleware(): void;
  initRoutes(): void;
}
