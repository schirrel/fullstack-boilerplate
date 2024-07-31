import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { User } from './schemas/user-auth.schema';
import { AuthGuard } from './auth.guard';

@Controller('api/auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) { }

  @Post('register')
  async registerUser(@Body() body: { email: string; password: string, role?: string }): Promise<{ message: string, id: string }> {
    const { email, password, role } = body;
    const result = await this.userAuthService.registerUser({ email, password, role });
    return { message: 'User registered successfully', id: result.id };
  }

  @Post('login')
  async loginUser(@Body() body: { email: string; password: string }): Promise<{ message: string; token: string }> {
    const { email, password } = body;
    const token = await this.userAuthService.loginUser(email, password);
    return { message: 'Login successful', token };
  }
}