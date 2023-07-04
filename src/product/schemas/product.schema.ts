import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Category {
  BASKETBALL = 'Basketball',
  BADMINTON = 'Badminton',
  SWIMMING = 'Swimming',
  SOCCER = 'Soccer',
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Product extends Document {
  @Prop({ required: true })
  product_name: string;

  @Prop({ required: true })
  category: Category;

  @Prop({ required: true })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
