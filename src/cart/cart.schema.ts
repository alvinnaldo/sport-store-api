import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'cart',
  timestamps: true,
  versionKey: false,
})
export class Cart extends Document {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  product_name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
