import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import * as Entities from '@family-coffee/entities';
import { databaseOptions } from './database-options';

config();

export const typeormConfig: DataSourceOptions = {
  type: 'mysql',
  ...databaseOptions(process.env),
  entities: Object.values(Entities),
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: false,
};
