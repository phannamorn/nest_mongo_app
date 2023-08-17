import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { TransactionType } from 'src/enums/transaction.type.enum';
import { Util } from 'src/helpers/util.helper';
import { TransferFilter } from './transfer.filter';
import { BaseService } from 'src/cores/base.service';
import { ITransferService } from './transfer.service.interface';
import { Transaction, TransactionDocument } from '../transaction/transaction.schema';
import { BankAccount, BankAccountDocument } from '../bank_account/schemas/bank_account.schema';
import { BankAccountService } from '../bank_account/bank_account.service';

@Injectable()
export class TransfersService extends BaseService implements ITransferService {
  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel(BankAccount.name) private readonly bankAccountModel: Model<BankAccountDocument>,
    private readonly bankAccountService: BankAccountService
  ) {
    super();
  }

  async create(createTransferDto: CreateTransferDto) {
    const sourceBankAccount = await this.bankAccountService.findBankAccountById(createTransferDto.bankAccountId);

    if (sourceBankAccount.balance < createTransferDto.amount) {
      throw new BadRequestException('Your account is insufficient balance');
    }

    const targetBankAccount = await this.bankAccountService.findBankAccountById(createTransferDto.referenceAccountId);

    const transferAmount: number = createTransferDto.amount;

    const transaction = await new this.transactionModel({
      ...createTransferDto,
      date: new Date(),
      type: TransactionType.TRANSFER
    }).save();

    // Update source balance in source bank acount
    const sourceBalance: number = Util.getInstance().updateBalanceAfterTransferOut(sourceBankAccount.balance, transferAmount);
    await this.bankAccountModel.findByIdAndUpdate(createTransferDto.bankAccountId, {balance: sourceBalance});

    // Update source balance in target bank acount
    const targetBalance: number = Util.getInstance().updateBalanceAfterReceiveTransfer(targetBankAccount.balance, transferAmount);
    await this.bankAccountModel.findByIdAndUpdate(createTransferDto.referenceAccountId, {balance: targetBalance});
    
    return transaction;
  }

  findAll(option: TransferFilter) {
    let filter: any = {};

    if (option.bankAccountId) {
      filter.bankAccountId = option.bankAccountId;
    }

    if (option.startDate && option.endDate) {
      filter.date = {
        $gte: `${option.startDate} 00:00:00`,
        $lte: `${option.endDate} 23:59:59`
      }
    }

    const query = this.transactionModel.find(filter).sort({date: 'desc'}).populate('bankAccount');
    
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

  findOne(id: string): Promise<Transaction> {
    return Promise.resolve(new Transaction());
  }
}
