import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
import { TransactionType } from 'src/enums/transaction.type.enum';
import { BankAccount, BankAccountSchema } from '../bank_account/schemas/bank_account.schema';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
    @Transform(({ value }) => value.toString())
    _id: string;
    
    @Prop()
    bankAccountId: string;

    @Prop()
    referenceAccountId: string;

    @Prop({ type: BankAccountSchema })
    @Type(() => BankAccount)
    bankAccount: BankAccount;

    @Prop()
    type: TransactionType;

    @Prop()
    amount: number;

    @Prop()
    date: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
