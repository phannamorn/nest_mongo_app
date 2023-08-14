import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SummaryTransaction, SummaryTransactionDocument } from 'src/summary_transaction/schema/summary_transaction.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectModel(SummaryTransaction.name) private readonly model: Model<SummaryTransactionDocument>) {}

  findAll() {
    return this.model.find();
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
