import { Provider, Scope } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DatabaseService } from './database.service';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';

export const datasourceFactory: { [key: string]: Provider } = {
  [Scope.DEFAULT]: {
    provide: 'data_source',
    useFactory: (): null => {
      return null;
    },
  },
  [Scope.REQUEST]: {
    provide: 'data_source',
    inject: [REQUEST, ConfigService, DatabaseService],
    scope: Scope.REQUEST,
    useFactory: async (
      req,
      configService: ConfigService,
      databaseService: DatabaseService,
    ): Promise<DataSource | null> => {
      console.log(
        `request is ${req}, mocking subdomain as 'tenant1Subdomiain'`,
      );
      const subdomain = 'tenant1Subdomiain'; // todo: mocked yet ...getting subdomain
      if (subdomain) {
        const databaseName = await databaseService.getDatabaseName(subdomain);
        return databaseService.getDBDataSource(databaseName);
      }
    },
  },
};
