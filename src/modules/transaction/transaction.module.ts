import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { BankAccount } from '../bank_account/entities/bank_account.entity';
import { BankAccountRepository } from '../bank_account/bank_account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, BankAccount])],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    BankAccountRepository
  ],
})
export class TransactionModule {}
