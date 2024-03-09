import * as Entities from '@family-coffee/entities';
import {DataSource, DataSourceOptions} from 'typeorm';

const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  entities: Object.values(Entities),
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: false,
};

export const AppDataSource = new DataSource(databaseConfig);
