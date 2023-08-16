import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TransactionType } from 'src/enums/transaction.type.enum';
import { Transaction, TransactionDocument } from '../transaction/transaction.schema';
import { 
  ElectricityPaymentDto, 
  PhoneCardPaymentDto, 
  TaxOnVehiclePaymentDto, 
  TaxRealestatePaymentDto, 
  WaterPaymentDto 
} from './dto/payment.dto';
import { IPaymentService } from './payment.service.interface';
import { PaymentFilter } from './payment.filter';
import { BaseService } from 'src/cores/base.service';

@Injectable()
export class PaymentService extends BaseService implements IPaymentService {
  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>
  ) {
    super();
  }

  async waterPayment(waterPaymentDto: WaterPaymentDto): Promise<Transaction> {
    return new this.transactionModel({
      bankAccountId: waterPaymentDto.bankAccountId,
      referenceAccountId: waterPaymentDto.waterBillId,
      type: TransactionType.WATER_PAYMENT,
      amount: waterPaymentDto.amount * (-1),
      date: new Date()
    }).save();
  }

  async electricityPayment(electricityPaymentDto: ElectricityPaymentDto): Promise<Transaction> {
    return new this.transactionModel({
      bankAccountId: electricityPaymentDto.bankAccountId,
      referenceAccountId: electricityPaymentDto.electricityBillId,
      type: TransactionType.ELECT_PAYMENT,
      amount: electricityPaymentDto.amount * (-1),
      date: new Date()
    }).save();
  }

  async phoneCardPayment(phoneCardPaymentDto: PhoneCardPaymentDto): Promise<Transaction> {
    return new this.transactionModel({
      bankAccountId: phoneCardPaymentDto.bankAccountId,
      referenceAccountId: phoneCardPaymentDto.phoneCardId,
      type: TransactionType.PHONE_CARD_PAYMENT,
      amount: phoneCardPaymentDto.amount * (-1),
      date: new Date()
    }).save();
  }

  async taxOnRealestatePayment(taxRealestatePaymentDto: TaxRealestatePaymentDto): Promise<Transaction> {
    return new this.transactionModel({
      bankAccountId: taxRealestatePaymentDto.bankAccountId,
      referenceAccountId: taxRealestatePaymentDto.realestateId,
      type: TransactionType.TAX_PAYMENT,
      amount: taxRealestatePaymentDto.amount * (-1),
      date: new Date()
    }).save();
  }
  
  async taxOnVehiclePayment(taxOnVehiclePaymentDto: TaxOnVehiclePaymentDto): Promise<Transaction> {
    return new this.transactionModel({
      bankAccountId: taxOnVehiclePaymentDto.bankAccountId,
      referenceAccountId: taxOnVehiclePaymentDto.vehicleId,
      type: TransactionType.TAX_PAYMENT,
      amount: taxOnVehiclePaymentDto.amount * (-1),
      date: new Date()
    }).save();
  }

  findAll(option: PaymentFilter): Promise<Transaction[]> {
    let filter: any = {};

    if (option.search) {
      filter = {
        $text: {
          $search: option.search
        }
      };
    }

    if (option.type) {
      filter.type = option.type;
    }
    
    const query = this.transactionModel.find(filter).sort({firstName: 'asc', lastName: 'asc'});

    if (option.offset) {
      query.skip(option.offset);
    }

    if (option.limit) {
      query.limit(option.limit);
    } else {
      query.limit(this.limit);
    }

    return query;
  }
}
