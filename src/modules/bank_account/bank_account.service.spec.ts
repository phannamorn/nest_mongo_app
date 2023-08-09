import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { DataSource } from 'typeorm';
import { BankAccountService } from './bank_account.service';
import { BankAccount } from './entities/bank_account.entity';

describe('BankAccountService', () => {
  let service: BankAccountService;

  const bankAccount: BankAccount = plainToClass(BankAccount, { id: 1, title: 'A test todo' });

  const mockedRepo = {
    findOneOrFail: jest.fn((id) => Promise.resolve(bankAccount)),
  };

  const dataSource = {
    createEntityManager: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BankAccountService,
        {
          provide: getRepositoryToken(BankAccount),
          useValue: mockedRepo,
        },
        {
          provide: DataSource,
          useValue: dataSource
        }
      ],
    }).compile();

    service = module.get<BankAccountService>(BankAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
