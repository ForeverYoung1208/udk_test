import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { appBuilder } from './helpers/default-app.factory';
import { VALIDATION_PIPE_OPTIONS } from '../src/constants';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const openedAppTestingModule = await appBuilder();
    const appModule = await openedAppTestingModule.compile();
    app = await appModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe(VALIDATION_PIPE_OPTIONS));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('OK');
  });
});
