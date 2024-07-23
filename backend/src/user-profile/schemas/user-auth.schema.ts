import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UserProfile {
  @Prop()
  userAuth: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  mobileNumber: string;
}

export type UserProfileDocument = UserProfile & Document;
export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
