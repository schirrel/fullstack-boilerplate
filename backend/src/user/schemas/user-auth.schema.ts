import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from './user-roles';

@Schema({ timestamps: true })
export class User {
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  role: Role;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
