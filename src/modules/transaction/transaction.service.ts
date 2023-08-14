import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Transaction } from './transaction.entity';
import { DepositDto } from '../bank_account/dto/deposit.dto';
import { TransferDto } from '../bank_account/dto/transfer.dto';
import { TransactionType } from 'src/enums/transaction.type.enum';
import { WithdrawDto } from '../bank_account/dto/withdraw.dto';
import { Util } from 'src/helpers/util.helper';
import { BankAccountRepository } from '../bank_account/bank_account.repository';
import { SummaryTransaction, SummaryTransactionDocument } from 'src/summary_transaction/schema/summary_transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
    @InjectModel(SummaryTransaction.name) private readonly model: Model<SummaryTransactionDocument>,
    private readonly bankAccountRepository: BankAccountRepository,
  ) {}
  
  async deposit(depositDto: DepositDto) {
    const bankAccount = await this.bankAccountRepository.getBankAccountById(depositDto.bank_account_id);

    const transaction = this.transactionRepository.save({
      ...depositDto,
      transaction_date: new Date(),
      transaction_type: TransactionType.DEPOSIT
    });

    const balance = Util.getInstance().updateBalanceAfterDeposit(bankAccount.balance, depositDto.amount);

    this.bankAccountRepository.update({id: depositDto.bank_account_id}, {balance});

    const currentDate = moment().format('YYYY-MM-DD');

    const summaryTransaction = await this.model.findOne({
      date: currentDate,
      type: TransactionType.DEPOSIT
    }).exec();

    if (summaryTransaction) {
      await this.model.findByIdAndUpdate(summaryTransaction.id, {amount: summaryTransaction.amount + depositDto.amount}, {new: true});
    } else {
      new this.model({
        accountNumber: bankAccount.account_number, 
        type: TransactionType.DEPOSIT, 
        date: currentDate, 
        amount: depositDto.amount
      }).save();
    }

    return transaction;
  }

  async transfer(transferDto: TransferDto) {
    const sourceBankAccount = await this.bankAccountRepository.getBankAccountById(transferDto.bank_account_id);
    const targetBankAccount = await this.bankAccountRepository.getBankAccountById(transferDto.reference_account_id);
    const transferAmount: number = transferDto.amount;

    const transaction = await this.transactionRepository.save({
      ...transferDto,
      transaction_date: new Date(),
      transaction_type: TransactionType.TRANSFER
    });

    // Update source balance in source bank acount
    const sourceBalance: number = Util.getInstance().updateBalanceAfterTransferOut(sourceBankAccount.balance, transferAmount);
    this.bankAccountRepository.update({id: transferDto.bank_account_id}, {balance: sourceBalance});

    // Update source balance in target bank acount
    const targetBalance: number = Util.getInstance().updateBalanceAfterReceiveTransfer(targetBankAccount.balance, transferAmount);
    this.bankAccountRepository.update({id: transferDto.reference_account_id}, {balance: targetBalance});

    const currentDate = moment().format('YYYY-MM-DD');

    const summaryTransaction = await this.model.findOne({
      date: currentDate,
      type: TransactionType.TRANSFER
    }).exec();
    
    if (summaryTransaction) {
      await this.model.findByIdAndUpdate(summaryTransaction.id, {amount: summaryTransaction.amount + transferDto.amount}, {new: true});
    } else {
      new this.model({
        accountNumber: sourceBankAccount.account_number,
        referenceAccountNumber: targetBankAccount.account_number,
        type: TransactionType.TRANSFER, 
        date: currentDate,
        amount: transferDto.amount
      }).save();
    }
    
    return transaction;
  }

  async withdraw(withdrawDto: WithdrawDto) {
    const bankAccount = await this.bankAccountRepository.getBankAccountById(withdrawDto.bank_account_id);

    const withdraw = this.transactionRepository.save({
      ...withdrawDto,
      transaction_date: new Date(),
      transaction_type: TransactionType.WITHDRAW
    });

    const balance = Util.getInstance().updateBalanceAfterWithdraw(bankAccount.balance, withdrawDto.amount);

    this.bankAccountRepository.update({id: withdrawDto.bank_account_id}, {balance});

    const currentDate = moment().format('YYYY-MM-DD');

    const summaryTransaction = await this.model.findOne({
      date: currentDate,
      type: TransactionType.WITHDRAW
    }).exec();

    if (summaryTransaction) {
      await this.model.findByIdAndUpdate(summaryTransaction.id, {amount: summaryTransaction.amount + withdrawDto.amount}, {new: true});
    } else {
      new this.model({
        accountNumber: bankAccount.account_number,
        type: TransactionType.WITHDRAW, 
        date: currentDate, 
        amount: withdrawDto.amount
      }).save();
    }
    
    return withdraw;
  }

  findAll() {
    const query = this.transactionRepository.createQueryBuilder('T');
    const transactions = query.innerJoin('T.bankAccount', 'B')
    .innerJoin('B.customer', 'C')
    .select([
      'B.account_number AS account_number',
      'C.first_name AS first_name',
      'C.last_name AS last_name',
      'T.transaction_type AS transaction_type',
      'T.amount AS amount',
      'DATE_FORMAT(T.transaction_date, "%Y-%m-%d") AS transaction_date'
    ])
    .getRawMany();

    return transactions;
  }

  findOne(id: number) {
    const transaction = this.transactionRepository.findOne({where: {id}});
    return transaction;
  }
}
