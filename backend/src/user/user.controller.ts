import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user-auth.schema';
import { AuthGuard } from 'src/user-auth/auth.guard';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get('users')
    @UseGuards(AuthGuard)
    async getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }
}
