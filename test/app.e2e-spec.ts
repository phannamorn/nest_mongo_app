import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
// import { AppService } from 'src/app.service';
import { CatsService } from 'src/modules/cats/cats.service.e2e';
import { Type } from 'src/enums/type.enum';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const appService = {
    findAll: () => [
      {
        name: 'hello',
        breed: 'hello',
        color: 'red',
        age: 10,
        type: Type.Abyssinian,
      },
    ],
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CatsService)
      .useValue(appService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(appService.findAll());
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(Array.isArray(JSON.parse(result.text))).toEqual(true);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
