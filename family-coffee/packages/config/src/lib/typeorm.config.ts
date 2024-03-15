import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import * as Entities from '@family-coffee/entities';
import { databaseOptions } from './database-options';

config();

export const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  ...databaseOptions(process.env),
  entities: Object.values(Entities),
  synchronize: true,
};
