import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TransactionType } from 'src/enums/transaction.type.enum';

export type BankAccountDocument = HydratedDocument<BankAccount>;

@Schema({timestamps: true})
export class BankAccount {
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

export const BankAccountSchema = SchemaFactory.createForClass(BankAccount);
