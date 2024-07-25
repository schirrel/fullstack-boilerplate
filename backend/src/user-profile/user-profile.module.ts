import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileSchema } from './schemas/user-profile.schema';
import { JwtService } from "@nestjs/jwt";
import { UserProfileViewSchema } from './schemas/user-profile-view.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserProfile', schema: UserProfileSchema },
      { name: 'UserProfileView', schema: UserProfileViewSchema, collection: 'listprofiles' }, // Specify the collection name

    ])
  ],
  providers: [UserProfileService, JwtService],
  controllers: [UserProfileController]
})
export class UserProfileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  }
}