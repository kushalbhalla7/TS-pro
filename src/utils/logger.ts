import { config } from 'src/config/config';
import { serverLogInfo } from 'src/constants/server-log-info';
import winston, { transports, format, createLogger } from 'winston';

export class Logger {
  module: string;
  logFilePath: string;
  errorLogFilePath: string;
  static _consoleLogger: winston.Logger = this.consoleLogger();
  private readonly winstonLogger: winston.Logger;

  constructor(
    moduleName?: string,
    logFilePath?: string,
    errorLogFilePath?: string
  ) {
    this.module = moduleName || serverLogInfo.moduleName;
    this.logFilePath = logFilePath || serverLogInfo.activityFilePath;
    this.errorLogFilePath = errorLogFilePath || serverLogInfo.errorFilePath;
    this.winstonLogger = this.createLoggerInstance();
  }

  static consoleLogger(): winston.Logger {
    return createLogger({
      transports: [
        new transports.Console({
          format: format.combine(format.colorize({ all: true }), format.json()),
          debugStdout: true,
        }),
      ],
    });
  }

  private createLoggerInstance(): winston.Logger {
    return createLogger({
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize({ all: true }),
            format.simple()
          ),
          debugStdout: true,
        }),
        new transports.File({
          filename: this.errorLogFilePath,
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
        }),
        new transports.File({
          filename: this.logFilePath,
          level: 'info',
          format: format.combine(format.timestamp(), format.json()),
        }),
      ],
    });
  }

  info(message: string): void {
    this.winstonLogger.info(message);
  }

  warn(message: string): void {
    this.winstonLogger.warn(message);
  }

  error(message: string): void {
    this.winstonLogger.error(message);
  }

  static logMessage(message: string) {
    if (config.envMode.development) {
      this._consoleLogger.info(message);
    }
  }
}
