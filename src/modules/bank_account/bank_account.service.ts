import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';
import { BankAccount, BankAccountDocument } from './schemas/bank_account.schema';
import { HttpCode } from 'src/https_code';
import { BankAccountStatus } from 'src/enums/bank_account_status.enum';
import { BankAccountFilter } from './bank_account.filter';
import { BaseService } from 'src/cores/base.service';

@Injectable()
export class BankAccountService extends BaseService {
  constructor(
    @InjectModel(BankAccount.name) private readonly model: Model<BankAccountDocument>
  ) {
    super();
  }

  async createBankAccount(bankAccountDto: CreateBankAccountDto) {
    return new this.model(bankAccountDto).save();
  }

  async findBankAccountById(bankAccountId: string) {
    const bankAccount = await this.model.findById(bankAccountId);

    if (!bankAccount) {
      throw new NotFoundException('Bank account is not found in system', HttpCode.NOT_FOUND);
    }

    if (bankAccount.status == BankAccountStatus.DEACTIVE) {
      throw new BadRequestException('Bank account is now deacative', HttpCode.DEACTIVE);
    }

    if (bankAccount.status == BankAccountStatus.BLOCKED) {
      throw new BadRequestException('Bank account is now blocked', HttpCode.BLOCKED)
    }

    return bankAccount;
  }

  findAll(option: BankAccountFilter): Promise<BankAccount[]> {
    let filter: any = {};

    const query = this.model.find(filter).sort({accountNumber: 'desc'});
    
    if (option.limit) {
      query.limit(option.limit);
    } else {
      query.limit(this.limit);
    }

    if (option.offset) {
      query.skip(option.offset);
    }

    return query;
  }

  findOne(id: string): Promise<BankAccount> {
    return this.model.findById(id).populate('transactions');
  }

  update(id: string, updateBankAccountDto: UpdateBankAccountDto) {
    return this.model.findByIdAndUpdate(id, updateBankAccountDto);
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  async blockAccount(id: string) {
    const bankAccount = await this.model.findById(id);
    if (!bankAccount) {
      throw new NotFoundException('Bank account is not found in system', HttpCode.NOT_FOUND);
    }
    return this.model.findByIdAndUpdate(bankAccount.id, {status: BankAccountStatus.BLOCKED});
  }

  async unBlockAccount(id: string) {
    const bankAccount = await this.model.findById(id);
    if(!bankAccount) {
      throw new NotFoundException('Bank account is not found in system', HttpCode.NOT_FOUND);
    }
    return this.model.findByIdAndUpdate(bankAccount.id, {status: BankAccountStatus.ACTIVE});
  }
}
