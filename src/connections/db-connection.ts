import mongoose from 'mongoose';
import { Logger } from 'src/utils/logger';
import { config } from 'src/config/config';

export const dbCreateConnection = async (): Promise<void> => {
  const serverLogger = new Logger();
  try {
    await mongoose.connect(config.MG_URI);
    Logger.logMessage(`Database connection success. Connection name`);
  } catch (error: any) {
    console.log(error);
    serverLogger.error(error.message);
  }
};
