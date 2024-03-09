import {getConfigValue} from './get-env';

export const databaseOptions = (env: NodeJS.ProcessEnv) => ({
  host: getConfigValue(env, 'DB_HOST'),
  port: Number(env.DB_PORT) || 3306,
  username: getConfigValue(env, 'DB_USERNAME', ''),
  password: getConfigValue(env, 'DB_PASSWORD', ''),
  database: getConfigValue(env, 'DB_DATABASE', ''),
});
