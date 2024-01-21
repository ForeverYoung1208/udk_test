import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();

export const getTenantNames = (): string[] => {
  return process.env.TENANT_NAMES.split(',');
};

export default registerAs('orm', () => {
  const config = {};

  // const entitiesPath = __dirname + '/../../**/*.entity{.ts,.js}';
  const entitiesPath = '{dist,src}/entites/*.entity{.ts,.js}';

  getTenantNames().forEach((tenantName) => {
    config[tenantName] = {
      type: 'postgres',
      host: process.env[`DB_${tenantName}_HOST`],
      port: parseInt(process.env[`DB_${tenantName}_PORT`]),
      username: process.env[`DB_${tenantName}_USERNAME`],
      password: process.env[`DB_${tenantName}_PASSWORD`],
      database: process.env[`DB_${tenantName}_DATABASE`],
      synchronize: false,
      entities: [entitiesPath],
    };
  });

  return config;
});
