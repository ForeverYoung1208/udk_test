import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import DataSourceManager from './dataSourceManager';

@Injectable()
export class DatabaseService {
  async getDBDataSource(databaseName: string): Promise<DataSource> {
    return DataSourceManager.getInstance().getDataSource(databaseName);
  }

  async getDatabaseName(subdomain: string): Promise<string> {
    console.log(`got subdomain ${subdomain}, database name mocked as 'tenant1`);
    const databaseName = 'tenant1'; //mocked yet
    return databaseName;
  }
}
