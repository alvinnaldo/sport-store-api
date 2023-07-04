import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum RoleEnum {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema({
  collection: 'user',
  timestamps: true,
  versionKey: false,
})
export class User extends Document {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  user_name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: RoleEnum })
  role: 'user' | 'admin';
}

export const UserSchema = SchemaFactory.createForClass(User);
