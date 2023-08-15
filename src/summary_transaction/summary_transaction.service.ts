import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as moment from 'moment';
import { CreateSummaryTransactionDto } from './dto/create-summary_transaction.dto';
import { UpdateSummaryTransactionDto } from './dto/update-summary_transaction.dto';
import { SummaryTransaction, SummaryTransactionDocument } from './schema/summary_transaction.schema';

@Injectable()
export class SummaryTransactionService {
  constructor(@InjectModel(SummaryTransaction.name) private readonly model: Model<SummaryTransactionDocument>) {}
  
  create(createSummaryTransactionDto: CreateSummaryTransactionDto) {
    return new this.model({
      ...createSummaryTransactionDto,
      date: moment().format('DD/MM/YYYY')
    }).save();
  }

  findAll() {
    return this.model.find().exec();
  }

  findOne(id: string) {
    return this.model.findById(id).exec();
  }

  update(id: string, updateSummaryTransactionDto: UpdateSummaryTransactionDto) {
    return this.model.findByIdAndUpdate(id, updateSummaryTransactionDto, {new: true});
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
