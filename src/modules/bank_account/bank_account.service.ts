import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';
import { BankAccount, BankAccountDocument } from './schemas/bank_account.schema';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectModel(BankAccount.name) private readonly model: Model<BankAccountDocument>
  ) {}

  async createBankAccount(bankAccountDto: CreateBankAccountDto) {
    return new this.model(bankAccountDto).save();
  }

  async findAll(): Promise<BankAccount[]> {
    return this.model.find().sort({accountNumber: "asc"});
  }

  async findOne(id: string): Promise<BankAccount> {
    return this.model.findById(id);
  }

  update(id: string, updateBankAccountDto: UpdateBankAccountDto) {
    return this.model.findByIdAndUpdate(id, updateBankAccountDto);
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
