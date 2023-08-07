import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return value not string', () => {
      expect(typeof appController.getHello() !== 'string').toBe(true);
    });

    it('should return value as array', () => {
      expect(Array.isArray(appController.getHello())).toBe(true);
    });
  });
});
