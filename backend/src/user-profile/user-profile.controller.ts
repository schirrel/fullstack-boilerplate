import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { AuthGuard } from 'src/user-auth/auth.guard';
import { UserProfile } from './schemas/user-auth.schema';

@Controller('api/profile')
export class UserProfileController {
    constructor(private readonly service: UserProfileService) { }

    @Get('list')
    @UseGuards(AuthGuard)
    async getProfiles(): Promise<UserProfile[]> {
        return this.service.getProfiles();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getProfile(@Param('id') id: string): Promise<UserProfile> {
        return this.service.getProfile({ id });
    }


    @Post(':userAuth')
    @UseGuards(AuthGuard)
    async createProfile(@Param('userAuth') userAuth: string, @Body() body: {
        firstName,
        lastName,
        mobileNumber
    }): Promise<{ message: string }> {
        const { firstName,
            lastName,
            mobileNumber } = body;
        return this.service.createProfile({
            userAuth,
            firstName,
            lastName,
            mobileNumber

        })
    }
}
