import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { DepositDto } from '../bank_account/dto/deposit.dto';
import { TransferDto } from '../bank_account/dto/transfer.dto';
import { TransactionType } from 'src/enums/transaction.type.enum';
import { WithdrawDto } from '../bank_account/dto/withdraw.dto';
import { Util } from 'src/helpers/util.helper';
import { SummaryTransaction, SummaryTransactionDocument } from 'src/summary_transaction/schema/summary_transaction.schema';
import { Transaction, TransactionDocument } from './transaction.schema';
import { BankAccount, BankAccountDocument } from '../bank_account/schemas/bank_account.schema';
import { TransactionFilter } from './transaction.filter';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel(SummaryTransaction.name) private readonly model: Model<SummaryTransactionDocument>,
    @InjectModel(BankAccount.name) private readonly bankAccountModel: Model<BankAccountDocument>
  ) {}
  
  async deposit(depositDto: DepositDto) {
    const bankAccount = await this.bankAccountModel.findById(depositDto.bankAccountId);

    const transaction = await new this.transactionModel({
      ...depositDto,
      date: new Date(),
      type: TransactionType.DEPOSIT,
    }).save();

    await this.transactionModel.findByIdAndUpdate(transaction.id, {$addToSet: {bankAccount: depositDto.bankAccountId}}, {new: true});

    const balance = Util.getInstance().updateBalanceAfterDeposit(bankAccount.balance || 0, depositDto.amount);

    await this.bankAccountModel.findByIdAndUpdate(depositDto.bankAccountId, {balance});

    const currentDate = moment().format('YYYY-MM-DD');

    const summaryTransaction = await this.model.findOne({
      date: currentDate,
      type: TransactionType.DEPOSIT
    }).exec();

    if (summaryTransaction) {
      await this.model.findByIdAndUpdate(summaryTransaction.id, {amount: summaryTransaction.amount + depositDto.amount});
    } else {
      new this.model({
        accountNumber: bankAccount.accountNumber, 
        type: TransactionType.DEPOSIT, 
        date: currentDate, 
        amount: depositDto.amount
      }).save();
    }

    return transaction;
  }

  async transfer(transferDto: TransferDto) {
    const sourceBankAccount = await this.bankAccountModel.findById(transferDto.bankAccountId);
    const targetBankAccount = await this.bankAccountModel.findById(transferDto.referenceAccountId);
    const transferAmount: number = transferDto.amount;

    const transaction = await new this.transactionModel({
      ...transferDto,
      date: new Date(),
      type: TransactionType.TRANSFER
    }).save();

    // Update source balance in source bank acount
    const sourceBalance: number = Util.getInstance().updateBalanceAfterTransferOut(sourceBankAccount.balance, transferAmount);
    await this.bankAccountModel.findByIdAndUpdate(transferDto.bankAccountId, {balance: sourceBalance});

    // Update source balance in target bank acount
    const targetBalance: number = Util.getInstance().updateBalanceAfterReceiveTransfer(targetBankAccount.balance, transferAmount);
    await this.bankAccountModel.findByIdAndUpdate(transferDto.referenceAccountId, {balance: targetBalance});

    const currentDate = moment().format('YYYY-MM-DD');

    const summaryTransaction = await this.model.findOne({
      date: currentDate,
      type: TransactionType.TRANSFER
    }).exec();
    
    if (summaryTransaction) {
      await this.model.findByIdAndUpdate(summaryTransaction.id, {amount: summaryTransaction.amount + transferDto.amount}, {new: true});
    } else {
      new this.model({
        accountNumber: sourceBankAccount.accountNumber,
        referenceAccountNumber: targetBankAccount.accountNumber,
        type: TransactionType.TRANSFER, 
        date: currentDate,
        amount: transferDto.amount
      }).save();
    }
    
    return transaction;
  }

  async withdraw(withdrawDto: WithdrawDto) {
    const bankAccount = await this.bankAccountModel.findById(withdrawDto.bankAccountId);
    
    const withdraw = new this.model({
      ...withdrawDto,
      date: new Date(),
      type: TransactionType.WITHDRAW
    }).save();

    const balance = Util.getInstance().updateBalanceAfterWithdraw(bankAccount.balance, withdrawDto.amount);

    this.bankAccountModel.findById(withdrawDto.bankAccountId, {balance});

    const currentDate = moment().format('YYYY-MM-DD');

    const summaryTransaction = await this.model.findOne({
      date: currentDate,
      type: TransactionType.WITHDRAW
    }).exec();

    if (summaryTransaction) {
      await this.model.findByIdAndUpdate(summaryTransaction.id, {amount: summaryTransaction.amount + withdrawDto.amount});
    } else {
      new this.model({
        accountNumber: bankAccount.accountNumber,
        type: TransactionType.WITHDRAW, 
        date: currentDate, 
        amount: withdrawDto.amount
      }).save();
    }
    
    return withdraw;
  }

  findAll(option: TransactionFilter) {
    let filter: any = {};

    if (option.bankAccountId) {
      filter.bankAccountId = option.bankAccountId;
    }

    if (option.startDate && option.endDate) {
      filter.date = {
        $gte: option.startDate,
        $lte: option.endDate
      }
    }

    const query = this.transactionModel.find(filter).sort({date: 'desc'}).populate('bankAccount');
    
    if (option.limit) {
      query.limit(option.limit);
    }

    if (option.offset) {
      query.skip(option.offset);
    }

    return query;
  }

  async findSummary() {
    const pipeline = [
      {
        $group: {
          _id: {
            bankAccountId: "$bankAccountId",
          },
          total: { $sum: "$amount" },
        },
      },
    ];

    const results = await this.transactionModel.aggregate(pipeline).limit(100);
    return results.map(result => ({
      bankAccountId: result._id.bankAccountId,
      total: result.total
    }));
  }

  findOne(id: string) {
    return this.transactionModel.findById(id).populate('bankAccount');
  }
}
