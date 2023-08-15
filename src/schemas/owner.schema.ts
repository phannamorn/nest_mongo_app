import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type OwnerDocument = HydratedDocument<Owner>;

@Schema()
export class Owner {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'cat', required: true })
    cat!: Types.ObjectId;
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);