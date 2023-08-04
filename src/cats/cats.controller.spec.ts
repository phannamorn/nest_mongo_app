import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './cat.entity';
import { CatDto } from './cat.dto';
import { Type } from 'src/enums/type.enum';

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;
  let req: Request;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        CatsService,
        JwtService,
        {
          provide: getRepositoryToken(Cat),
          useValue: {}         
        }
      ]
    }).compile();

    service = module.get(CatsService);
    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result: CatDto[] = [{name: '', breed: '', color: '', type: Type.Persian, age: 0}];
      
      jest.spyOn(service, 'getAll').mockImplementation(() => Promise.resolve(result));

      expect(Array.isArray((await controller.getAll(req)))).toBe(true);
    });
  });
});
