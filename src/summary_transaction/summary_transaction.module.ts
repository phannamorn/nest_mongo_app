import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SummaryTransactionService } from './summary_transaction.service';
import { SummaryTransactionController } from './summary_transaction.controller';
import { SummaryTransaction, SummaryTransactionSchema } from './schema/summary_transaction.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: SummaryTransaction.name, schema: SummaryTransactionSchema}])],
  controllers: [SummaryTransactionController],
  providers: [SummaryTransactionService]
})
export class SummaryTransactionModule {}
