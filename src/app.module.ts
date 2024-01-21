import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import { PostsModule } from './modules/posts/posts.module';
import { PostsController } from './modules/posts/posts.controller';
import { BullModule } from '@nestjs/bull';
import { PostsProcessor } from './processors/posts.processors';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig, { getTenantNames } from 'src/database/orm.config';

// database connection for each tenantid
const databasesConfig = getTenantNames().map((tenantName) => {
  return TypeOrmModule.forRootAsync({
    name: `db-${tenantName}`,
    imports: [ConfigModule.forFeature(ormConfig)],
    useFactory: (config: ConfigService) => config.get(`orm.${tenantName}`),
    inject: [ConfigService],
  });
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema: config().envValidationConfig,
    }),
    ...databasesConfig,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisConfig = configService.get('redisConfig');
        console.log('[redisConfig]', redisConfig);
        return redisConfig;
      },
    }),
    PostsModule,
  ],
  controllers: [AppController, PostsController],
  providers: [AppService, PostsProcessor],
})
export class AppModule {}
