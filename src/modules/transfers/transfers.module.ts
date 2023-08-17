import { Module } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from '../transaction/transaction.schema';
import { BankAccount, BankAccountSchema } from '../bank_account/schemas/bank_account.schema';
import { TRANSFER_SERVICE } from './transfer.service.interface';
import { BankAccountService } from '../bank_account/bank_account.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Transaction.name, schema: TransactionSchema},
      {name: BankAccount.name, schema: BankAccountSchema}
    ])
  ],
  controllers: [TransfersController],
  providers: [
    BankAccountService,
    {
      provide: TRANSFER_SERVICE,
      useClass: TransfersService
    }
  ]
})
export class TransfersModule {}
