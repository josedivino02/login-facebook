import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'silly.db.elephantsql.com',
  port: 5432,
  username: 'mjxrvcai',
  password: 'a3FAzPd97oDojA15Dl1zM8dIxuX9NcmJ',
  database: 'mjxrvcai',
  entities: ['dist/infra/postgres/entities/index.js'],
};
