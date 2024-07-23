import { Injectable, Logger } from '@nestjs/common';
import { UserProfile } from './schemas/user-auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAuthService } from 'src/user-auth/user-auth.service';
import { User } from 'src/user-auth/schemas/user-auth.schema';

@Injectable()
export class UserProfileService {
  private readonly logger = new Logger(UserProfileService.name);

  constructor(
    @InjectModel(UserProfile.name) private userProfileModel: Model<UserProfile>,
    private readonly userAuthService: UserAuthService
  ) { }

  async createProfile({
    userAuth,
    firstName,
    lastName,
    mobileNumber
  }: {
    userAuth: string,
    firstName: string,
    lastName: string,
    mobileNumber: string
  }): Promise<{ message: string }> {
    try {
      await this.userProfileModel.create({
        userAuth,
        firstName,
        lastName,
        mobileNumber
      });
      return { message: 'Profile successfully created.' };
    } catch (error) {
      throw new Error('An error occurred while registering the user');
    }
  }

  async getProfile({ email, id }: { email?: string, id?: string }): Promise<UserProfile> {
    try {
      if (!email && !id) {
        return null;
      }
      const profile = email ? await this.userProfileModel.findOne({ email }) : await this.userProfileModel.findById(id);
      return profile;
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving user: ${error.message}`,
      );
      throw new Error('An error occurred while retrieving user');
    }
  }
  async getUserProfile({ email, id }): Promise<{ profile: UserProfile, user: User }> {
    try {
      if (!email && !id) {
        return null;
      }
      const profile = email ? await this.userProfileModel.findOne({ email }) : await this.userProfileModel.findById(id);
      const user = await this.userAuthService.getUser({ id: profile.userAuth });
      return { profile, user };
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving user: ${error.message}`,
      );
      throw new Error('An error occurred while retrieving user');
    }
  }

  async getProfiles(): Promise<UserProfile[]> {
    try {
      const profiles = await this.userProfileModel.find({});
      return profiles;
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving profiles: ${error.message}`,
      );
      throw new Error('An error occurred while retrieving profiles');
    }
  }
}
