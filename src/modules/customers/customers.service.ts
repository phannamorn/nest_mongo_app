import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './update-customer.dto';
import { Customer } from './entities/customer.entity';
import { TopCustomer } from './dto/top-customer.dto';
import { HttpCode } from 'src/https_code';
import { FilterOptions } from 'src/types/filter.option';
import { HighestScoreCustomer } from './dto/highest-score-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private dataSource: DataSource
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const { email, phone_number } = createCustomerDto;
    const existCustomer: Customer = await this.customerRepository.findOne({
      select: ['email', 'phone_number'],
      where: [{ email }, { phone_number }],
    });

    if (existCustomer?.email == email) {
      throw new BadRequestException('You cannot use this email address because it is already taken.', HttpCode.EMAIL_TAKEN);
    } else if (existCustomer?.phone_number == phone_number) {
      throw new BadRequestException('You cannot use this phone number because it is already taken.', HttpCode.PHONE_NUMBER_TAKEN);
    }

    const customer = this.customerRepository.save(createCustomerDto);
  
    return customer;
  }

  findAll() {
    const customers = this.customerRepository.find();
    return customers;
  }

  async getTopCustomersWithMostTransactions(option: FilterOptions): Promise<TopCustomer[]> {
    const topCustomers: TopCustomer[] = await this.customerRepository
      .createQueryBuilder('C')
      .innerJoin('C.transactions', 'T')
      .select(['first_name', 'last_name', 'COUNT(T.id) AS total_transaction'])
      .groupBy('T.customer_id')
      .limit(option.limit)
      .getRawMany();

    return topCustomers;
  }

  async getHighestCreditScore(option: FilterOptions) {
    const highestCreditScores: HighestScoreCustomer[] = await this.customerRepository.createQueryBuilder('C')
    .select([
      'first_name',
      'last_name',
      'credit_score'
    ])
    .orderBy('credit_score', 'DESC')
    .limit(option.limit)
    .getRawMany();

    return highestCreditScores;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
