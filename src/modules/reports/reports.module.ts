import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SummaryTransaction, SummaryTransactionSchema } from 'src/summary_transaction/schema/summary_transaction.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: SummaryTransaction.name, schema: SummaryTransactionSchema}])],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
