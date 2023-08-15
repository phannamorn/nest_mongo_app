import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
import { BankAccountType } from 'src/enums/account.type.enum';
import { BankAccountStatus } from 'src/enums/bank_account_status.enum';
import { TransactionType } from 'src/enums/transaction.type.enum';

export type BankAccountDocument = HydratedDocument<BankAccount>;

@Schema({timestamps: true})
export class BankAccount {
    @Transform(({ value }) => value.toString())
    _id: string;

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
