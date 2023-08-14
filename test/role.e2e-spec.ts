import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RolesModule } from 'src/modules/roles/roles.module';
import { RolesService } from 'src/modules/roles/roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { RolesController } from 'src/modules/roles/roles.controller';
// import { Type } from 'src/enums/type.enum';

describe('RoleController (e2e)', () => {
  let app: INestApplication;
  let controller: RolesController;
  const rolesService = { findAll: jest.fn() };

  const mockRoleRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  const mockUserRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RolesModule],
    })
      .overrideProvider(RolesService)
      .useValue(rolesService)
      .overrideProvider(getRepositoryToken(Role))
      .useValue(mockRoleRepository)
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
      .compile();

    controller = moduleFixture.get<RolesController>(RolesController);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be define', () => {
    expect(controller).toBeDefined();
  });

  describe('/roles (GET)', () => {
    jest.spyOn(rolesService, 'findAll');

    it('should be define', () => {
      expect(rolesService.findAll).toBeDefined();
    });

    it('should call service.findAll', () => {
      controller.findAll();
      expect(rolesService.findAll).toBeCalledTimes(1);
    });

    it('/GET roles', () => {
      return request(app.getHttpServer()).get('/roles').expect(200);
    });
  });

  it('/roles/:id (GET)', async () => {
    const roleId = '1';
    await request(app.getHttpServer()).get(`/roles/${roleId}`).expect(200);
  });

  // it('/cats (POST)', async () => {
  //   const cat = {
  //     name: 'Barsik',
  //     breed: 'Persian',
  //     age: 1,
  //   };
  //   const response = await request(app.getHttpServer())
  //     .post('/cats')
  //     .send(cat)
  //     .expect(201);

  //   // const createdCat = await response.json();
  //   const createdCat = {name: '', breed: '', type: Type.Persian, age: 1};
  //   expect(createdCat).toBeDefined();
  //   expect(createdCat.name).toEqual(cat.name);
  //   expect(createdCat.breed).toEqual(cat.breed);
  //   expect(createdCat.age).toEqual(cat.age);
  // });

  // it('/cats/:id (PUT)', async () => {
  //   const catId = '1';
  //   const cat = {
  //     name: 'Barsik the Second',
  //     breed: 'Persian',
  //     age: 2,
  //   };
  //   const response = await request(app.getHttpServer())
  //     .put(`/cats/${catId}`)
  //     .send(cat)
  //     .expect(200);

  //   // const updatedCat = await response.json();
  //   const updatedCat = {name: '', breed: '', type: Type.Persian, age: 1};
  //   expect(updatedCat).toBeDefined();
  //   expect(updatedCat.name).toEqual(cat.name);
  //   expect(updatedCat.breed).toEqual(cat.breed);
  //   expect(updatedCat.age).toEqual(cat.age);
  // });

  // it('/cats/:id (DELETE)', async () => {
  //   const catId = '1';
  //   const response = await request(app.getHttpServer())
  //     .delete(`/cats/${catId}`)
  //     .expect(204);

  //   expect(response.text).toBe('');
  // });
});
