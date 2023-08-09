import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { BankAccountController } from './bank_account.controller';
import { BankAccountService } from './bank_account.service';
import { BankAccount } from './entities/bank_account.entity';

describe('Bank Account Controller', () => {
  let controller: BankAccountController;

  const bankAccount: BankAccount = plainToClass(BankAccount, { id: 1, title: 'A test todo' });

  const mockedRepo = {
    findOneOrFail: jest.fn((id) => Promise.resolve(bankAccount)),
  };

  const dataSource = {
    createEntityManager: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankAccountController],
      providers: [
        BankAccountService,
        {
          provide: getCustomRepositoryToken(BankAccount),
          useValue: mockedRepo
        },
        {
          provide: DataSource,
          useValue: dataSource
        }
      ],
    }).compile();

    controller = module.get<BankAccountController>(BankAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
