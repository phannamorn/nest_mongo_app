import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { BankAccount } from '../bank_account/entities/bank_account.entity';
import { BankAccountRepository } from '../bank_account/bank_account.repository';
import { Session } from '../auth/session.entity';
import { SummaryTransaction, SummaryTransactionSchema } from 'src/summary_transaction/schema/summary_transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, BankAccount, Session]),
    MongooseModule.forFeature([{name: SummaryTransaction.name, schema: SummaryTransactionSchema}])
  ],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    BankAccountRepository
  ],
})
export class TransactionModule {}
