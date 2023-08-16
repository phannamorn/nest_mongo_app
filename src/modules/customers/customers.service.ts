import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './update-customer.dto';
import { Customer, CustomerDocument } from './schemas/customer.schema';
import { HttpCode } from 'src/https_code';
import { FilterOptions, QueryOption } from 'src/types/filter.option';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private readonly model: Model<CustomerDocument>
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const { email, phoneNumber } = createCustomerDto;
    const existCustomer: Customer = await this.model.findOne({
      $or: [
        {email},
        {phoneNumber}
      ]
    });

    if (existCustomer?.email == email) {
      throw new BadRequestException('You cannot use this email address because it is already taken.', HttpCode.EMAIL_TAKEN);
    } else if (existCustomer?.phoneNumber == phoneNumber) {
      throw new BadRequestException('You cannot use this phone number because it is already taken.', HttpCode.PHONE_NUMBER_TAKEN);
    }

    return new this.model(createCustomerDto).save();
  }

  findAll(option: FilterOptions) {
    let fitler: QueryOption;

    if (option.search) {
      fitler = {
        $text: {
          $search: option.search
        }
      };
    }
    
    const query = this.model.find(fitler).sort({firstName: 'asc', lastName: 'asc'});

    if (option.offset) {
      query.skip(option.offset);
    }

    if (option.limit) {
      query.limit(option.limit);
    }

    return query;
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.model.findByIdAndUpdate(id, updateCustomerDto);
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
