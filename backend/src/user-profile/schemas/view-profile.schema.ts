import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, model } from 'mongoose';
import { Role } from 'src/user-auth/schemas/user-roles';

@Schema({ timestamps: true })
export class ViewProfile {
  @Prop()
  email: string;
  @Prop()
  role: Role;
  @Prop()
  name: string;
  @Prop()
  mobileNumber: string;
}

export type UserProfileViewDocument = ViewProfile & Document;
export const UserProfileViewSchema = SchemaFactory.createForClass(ViewProfile)


export const MyViewModel = model<ViewProfile>('UserProfileView', UserProfileViewSchema, 'listprofiles');