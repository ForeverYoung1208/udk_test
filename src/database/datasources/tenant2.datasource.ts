import * as dotenv from 'dotenv';
import { commonDSConfig } from './commonDSConfig';
import { DataSource } from 'typeorm';
dotenv.config();

export default new DataSource({
  name: 'tenant2',
  type: 'postgres',
  host: process.env['DB_TENANT2_HOST'],
  port: parseInt(process.env['DB_TENANT2_PORT'], 10),
  database: process.env['DB_TENANT2_DATABASE'],
  username: process.env['DB_TENANT2_USERNAME'],
  password: process.env['DB_TENANT2_PASSWORD'],
  ...commonDSConfig,
});
