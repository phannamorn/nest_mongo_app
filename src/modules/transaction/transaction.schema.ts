import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TransactionType } from 'src/enums/transaction.type.enum';
import { BankAccount } from '../bank_account/schemas/bank_account.schema';

export type TransactionDocument = Transaction & Document;

@Schema({versionKey: false})
export class Transaction {
   
    @Prop()
    bankAccountId: string;

    @Prop()
    referenceAccountId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'BankAccount' })
    bankAccount: BankAccount;

    @Prop()
    type: TransactionType;

    @Prop()
    amount: number;

    @Prop()
    date: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
