import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type BankAccountDocument = HydratedDocument<BankAccount>;

@Schema({timestamps: true})
export class BankAccount {
    @Prop()
    accountNumber: string;

    @Prop()
    balance: number;

    @Prop()
    minTransfer: number;

    @Prop()
    maxTransfer: number;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'SummaryTransaction', required: true })
    summaryTransaction!: Types.ObjectId;
}

export const BankAccountSchema = SchemaFactory.createForClass(BankAccount);
