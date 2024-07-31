import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user-auth.schema';
import { AuthGuard } from 'src/user-auth/auth.guard';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  @UseGuards(AuthGuard)
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser({ id });
  }
}
