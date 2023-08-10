import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { BankAccount } from '../bank_account/entities/bank_account.entity';

describe('TransactionService', () => {
  let service: TransactionService;

  const transaction: Transaction = plainToClass(Transaction, { id: 1, title: 'A test todo' });

  const mockedRepo = {
    findOneOrFail: jest.fn((id) => Promise.resolve(transaction)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: mockedRepo
        },
        {
          provide: getRepositoryToken(BankAccount),
          useValue: mockedRepo
        },
      ]
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
