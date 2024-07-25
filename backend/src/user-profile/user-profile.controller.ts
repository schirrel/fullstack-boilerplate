import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { AuthGuard } from 'src/user-auth/auth.guard';
import { UserProfile } from './schemas/user-profile.schema';
import { UserProfileView } from './schemas/user-profile-view.schema';

@Controller('api/profile')
export class UserProfileController {
    constructor(private readonly service: UserProfileService) { }

    @Get('list')
    @UseGuards(AuthGuard)
    async getProfiles(): Promise<UserProfileView[]> {
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
        name,
        mobileNumber
    }): Promise<{ message: string }> {
        const { name,
            mobileNumber } = body;
        return this.service.createProfile({
            userAuth,
            name,
            mobileNumber

        })
    }
}
