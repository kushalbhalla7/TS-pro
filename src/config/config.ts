import dotenv from 'dotenv';
import IConfig from 'src/interfaces/env-config-interface';

dotenv.config({ path: '.env' });
interface IResponseEnv {
  [key: string]: boolean;
}

const getNodeEnv = (env: string): IResponseEnv => {
  const responseEnv: { [key: string]: boolean } = {
    local: false,
    development: false,
    staging: false,
    production: false,
  };

  switch (env) {
    case 'local':
      responseEnv.local = true;
      break;

    case 'development':
      responseEnv.development = true;
      break;

    case 'staging':
      responseEnv.staging = true;
      break;

    case 'production':
      responseEnv.production = true;
      break;
  }
  return responseEnv;
};

const envMode = getNodeEnv(process.env.NODE_ENV || 'development');

export const config: IConfig = {
  envMode,
  port: Number(process.env.PORT) || 3000,
  MG_URI: process.env.MG_URI || '',
  bcryptEncryption: {
    saltRounds: parseInt(process.env.SALT_ROUNDS || '10'),
  },
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'super-secret-key',
  swagger_host:
    process.env.SWAGGER_HOST || `localhost:${process.env.PORT || 3000}`,
};
