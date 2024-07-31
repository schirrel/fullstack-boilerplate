import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class UserProfile {
  @Prop({
    type: Types.ObjectId,
  })
  userId: string;
  @Prop()
  name: string;
  @Prop()
  mobileNumber: string;
}

export type UserProfileDocument = UserProfile & Document;
export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
export type UserProfileDTO = Partial<UserProfile>;
