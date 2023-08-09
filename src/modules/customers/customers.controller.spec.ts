import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Customer } from './entities/customer.entity';
import { BankAccount } from '../bank_account/entities/bank_account.entity';

describe('CustomersController', () => {
  let controller: CustomersController;

  const bankAccount: BankAccount = plainToClass(BankAccount, { id: 1, title: 'A test todo' });

  const mockedRepo = {
    findOneOrFail: jest.fn((id) => Promise.resolve(bankAccount)),
  };

  const dataSource = {
    createEntityManager: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        CustomersService,
        JwtService,
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

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
