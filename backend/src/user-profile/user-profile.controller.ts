import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { AuthGuard } from 'src/user-auth/auth.guard';
import { UserProfile, UserProfileDTO } from './schemas/user-profile.schema';
import { ViewProfile } from './schemas/view-profile.schema';
import { ObjectId } from 'mongodb';

@Controller('api/profile')
export class UserProfileController {
  constructor(private readonly service: UserProfileService) {}

  @Get('list')
  @UseGuards(AuthGuard)
  async getProfiles(): Promise<ViewProfile[]> {
    return this.service.getProfiles();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getProfile(@Param('id') id: string): Promise<UserProfile> {
    return this.service.getProfile({ id });
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateProfile(
    @Param('id') id: string,
    @Body() profile: UserProfileDTO,
  ): Promise<UserProfile> {
    return this.service.updateProfile(id, profile);
  }

  @Get('/user/:id')
  @UseGuards(AuthGuard)
  async getProfileByUser(@Param('id') id: string): Promise<UserProfile> {
    return this.service.getProfileBy({ userId: new ObjectId(id) });
  }

  @Post(':userId')
  @UseGuards(AuthGuard)
  async createProfile(
    @Param('userId') userId: string,
    @Body()
    body: {
      name;
      mobileNumber;
    },
  ): Promise<{ message: string }> {
    const { name, mobileNumber } = body;
    return this.service.createProfile({
      userId,
      name,
      mobileNumber,
    });
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async getLogged(@Req() request: Request) {
    return this.service.getUserProfile(request['user']?.['userId']);
  }
}
