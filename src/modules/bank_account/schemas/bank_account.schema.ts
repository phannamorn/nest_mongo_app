import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { BankAccountType } from 'src/enums/account.type.enum';
import { BankAccountStatus } from 'src/enums/bank_account_status.enum';
import { TransactionType } from 'src/enums/transaction.type.enum';
import { Transaction } from 'src/modules/transaction/transaction.schema';

export type BankAccountDocument = BankAccount & Document;

@Schema({timestamps: true})
export class BankAccount {
    @Transform(({ value }) => value.toString())
    _id: string;

    @Prop([{ type: mongoose.Types.ObjectId, ref: 'Transaction' }])
    transactions: [Transaction];

    @Prop()
    accountNumber: string;

    @Prop()
    referenceAccountNumber: string;

    @Prop()
    date: string;

    @Prop()
    type: TransactionType;

    @Prop()
    customerId: string;

    @Prop()
    balance: number;

    @Prop()
    accountType: BankAccountType;

    @Prop()
    minTransfer: number;

    @Prop()
    maxTransfer: number;

    @Prop()
    status: BankAccountStatus;
}

export const BankAccountSchema = SchemaFactory.createForClass(BankAccount);
