import { Module } from '@nestjs/common';
import { BankAccountService } from './bank_account.service';
import { BankAccountController } from './bank_account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccount } from './entities/bank_account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccount])],
  controllers: [BankAccountController],
  providers: [BankAccountService],
})
export class BankAccountModule {}
