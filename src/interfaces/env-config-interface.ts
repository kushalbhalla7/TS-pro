export default interface IConfig {
  envMode: { [key: string]: boolean };
  port: number;
  MG_URI: string;
  bcryptEncryption: {
    saltRounds: number;
  };
  accessTokenSecret: string;
  swagger_host: string;
}
