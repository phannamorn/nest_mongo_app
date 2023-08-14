import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Type } from 'src/enums/type.enum';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
    @Prop()
    name: string;

    @Prop()
    type: Type;

    @Prop()
    color: string;

    @Prop()
    age: number;

    @Prop()
    breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);