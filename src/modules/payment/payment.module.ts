import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { Session } from '../auth/session.entity';
import { BankAccount, BankAccountSchema } from '../bank_account/schemas/bank_account.schema';
import { PaymentService } from './payment.service';
import { PAYMENT_SERVICE } from './payment.service.interface';
import { PaymentController } from './payment.controller';
import { Transaction, TransactionSchema } from '../transaction/transaction.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session]),
    MongooseModule.forFeature([
      {name: Transaction.name, schema: TransactionSchema},
      {name: BankAccount.name, schema: BankAccountSchema},
    ])
  ],
  controllers: [PaymentController],
  providers: [
    {
      useClass: PaymentService,
      provide: PAYMENT_SERVICE
    }
  ],
})
export class PaymentModule {}
