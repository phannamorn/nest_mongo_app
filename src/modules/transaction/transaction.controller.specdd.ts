import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';

describe('TransactionController', () => {
  let controller: TransactionController;

  const transaction: Transaction = plainToClass(Transaction, { id: 1, title: 'A test todo' });

  const mockedRepo = {
    findOneOrFail: jest.fn((id) => Promise.resolve(transaction))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        TransactionService,
        {
          provide: getCustomRepositoryToken(Transaction),
          useValue: mockedRepo
        },
        // {
        //   provide: getCustomRepositoryToken(BankAccount),
        //   useValue: mockedRepo
        // }
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
