import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileSchema } from './schemas/user-auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserProfile', schema: UserProfileSchema }]),
  ],
  providers: [UserProfileService],
  controllers: [UserProfileController]
})
export class UserProfileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  }
}