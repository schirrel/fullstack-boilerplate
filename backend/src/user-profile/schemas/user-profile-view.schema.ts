import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, model } from 'mongoose';
import { Role } from 'src/user-auth/schemas/user-roles';

@Schema({ timestamps: true })
export class UserProfileView {
  @Prop()
  email: string;
  @Prop()
  role: Role;
  @Prop()
  name: string;
  @Prop()
  mobileNumber: string;
}

export type UserProfileViewDocument = UserProfileView & Document;
export const UserProfileViewSchema = SchemaFactory.createForClass(UserProfileView)


export const MyViewModel = model<UserProfileView>('UserProfileView', UserProfileViewSchema, 'listprofiles');