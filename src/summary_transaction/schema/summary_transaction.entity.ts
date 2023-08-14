import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { TransactionType } from 'src/enums/transaction.type.enum';
import { BankAccount } from 'src/modules/bank_account/schemas/bank_account.schema';

export type SummaryTransactionDocument = HydratedDocument<SummaryTransaction>;

@Schema({timestamps: true})
export class SummaryTransaction {
    @Prop()
    accountNumber: string;

    @Prop()
    referenceAccountNumber: string;

    @Prop()
    date: string;

    @Prop()
    type: TransactionType;

    @Prop()
    amount: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: BankAccount.name })
    bankAccount: BankAccount;
}

export const SummaryTransactionSchema = SchemaFactory.createForClass(SummaryTransaction);
