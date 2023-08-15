import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({timestamps: true})
export class Customer {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    email: string;

    @Prop()
    phoneNumber: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
