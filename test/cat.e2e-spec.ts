import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CatsModule } from 'src/cats/cats.module';
import { Type } from 'src/enums/type.enum';
import { CatsService } from 'src/cats/cats.service';

describe('CatController (e2e)', () => {
  let app: INestApplication;
  let catsService = { findAll: () => ['test'] };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CatsModule]
    })
    .overrideProvider(CatsService)
    .useValue(catsService)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/cats (GET)', async () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .expect({
        data: catsService.findAll(),
      });
  });

  it('/cats/:id (GET)', async () => {
    const catId = '1';
    const response = await request(app.getHttpServer())
      .get(`/cats/${catId}`)
      .expect(200);

    // const cat = await response.json();
    const cat = {id: 1};
    expect(cat).toBeDefined();
    expect(cat.id).toEqual(catId);
  });

  it('/cats (POST)', async () => {
    const cat = {
      name: 'Barsik',
      breed: 'Persian',
      age: 1,
    };
    const response = await request(app.getHttpServer())
      .post('/cats')
      .send(cat)
      .expect(201);

    // const createdCat = await response.json();
    const createdCat = {name: '', breed: '', type: Type.Persian, age: 1};
    expect(createdCat).toBeDefined();
    expect(createdCat.name).toEqual(cat.name);
    expect(createdCat.breed).toEqual(cat.breed);
    expect(createdCat.age).toEqual(cat.age);
  });

  it('/cats/:id (PUT)', async () => {
    const catId = '1';
    const cat = {
      name: 'Barsik the Second',
      breed: 'Persian',
      age: 2,
    };
    const response = await request(app.getHttpServer())
      .put(`/cats/${catId}`)
      .send(cat)
      .expect(200);

    // const updatedCat = await response.json();
    const updatedCat = {name: '', breed: '', type: Type.Persian, age: 1};
    expect(updatedCat).toBeDefined();
    expect(updatedCat.name).toEqual(cat.name);
    expect(updatedCat.breed).toEqual(cat.breed);
    expect(updatedCat.age).toEqual(cat.age);
  });

  it('/cats/:id (DELETE)', async () => {
    const catId = '1';
    const response = await request(app.getHttpServer())
      .delete(`/cats/${catId}`)
      .expect(204);

    expect(response.text).toBe('');
  });
});
