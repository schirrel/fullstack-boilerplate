import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserProfile, UserProfileDTO } from './schemas/user-profile.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ViewProfile } from './schemas/view-profile.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserProfileService {
  private readonly logger = new Logger(UserProfileService.name);

  constructor(
    @InjectModel(UserProfile.name) private userProfileModel: Model<UserProfile>,
    @InjectModel('ViewProfile')
    private readonly profileView: Model<ViewProfile>,
  ) {}

  async createProfile({
    userId,
    name,
    mobileNumber,
  }: {
    userId: string;
    name: string;
    mobileNumber: string;
  }): Promise<{ message: string }> {
    try {
      const result = await this.userProfileModel.create({
        userId: new ObjectId(userId),
        name,
        mobileNumber,
      });
      console.log(result);
      return { message: 'Profile successfully created.' };
    } catch (error) {
      throw new Error('An error occurred while registering the user');
    }
  }

  async getProfile({
    email,
    id,
  }: {
    email?: string;
    id?: string;
  }): Promise<UserProfile> {
    try {
      if (!email && !id) {
        return null;
      }
      const profile = email
        ? await this.userProfileModel.findOne({ email })
        : await this.userProfileModel.findById(id);
      return profile;
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving user: ${error.message}`,
      );
      throw new Error('An error occurred while retrieving user');
    }
  }
  async getUserProfile(id: string): Promise<ViewProfile> {
    try {
      if (!id) {
        return null;
      }
      const profile = await this.profileView.findById(id);
      return profile;
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving user: ${error.message}`,
      );
      throw new Error('An error occurred while retrieving user');
    }
  }

  async getProfiles(): Promise<ViewProfile[]> {
    try {
      const profiles = await this.profileView.find({}).exec();
      return profiles;
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving profiles: ${error.message}`,
      );
      throw new Error('An error occurred while retrieving profiles');
    }
  }
  async getProfileBy(search: any): Promise<UserProfile> {
    try {
      const profiles = await this.userProfileModel.findOne(search).exec();
      return profiles;
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving profiles: ${error.message}`,
      );
      throw new Error('An error occurred while retrieving profiles');
    }
  }

  async updateProfile(id: string, profile: UserProfileDTO) {
    return this.userProfileModel.findOneAndUpdate(
      { userId: new ObjectId(id) },
      profile,
    );
  }
}
