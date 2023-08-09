import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CustomersService } from './customers.service';
import { Customer } from './entities/customer.entity';
import { BankAccount } from '../bank_account/entities/bank_account.entity';
import { plainToClass } from 'class-transformer';

describe('CustomersService', () => {
  let service: CustomersService;

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
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockedRepo,
        },
        {
          provide: DataSource,
          useValue: dataSource
        }
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
