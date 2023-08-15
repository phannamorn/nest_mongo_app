import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TransactionType } from 'src/enums/transaction.type.enum';

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
}

export const SummaryTransactionSchema = SchemaFactory.createForClass(SummaryTransaction);

SummaryTransactionSchema.virtual('bankAccount', {
    ref: 'BankAccount',
    localField: '_id',
    foreignField: 'bankAccount',
});
