import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user-auth.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from './schemas/user-roles';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async registerUser({ email, password, role }:
    {
      email: string,
      password: string,
      role: string
    },
  ): Promise<{ message: string, id: string }> {
    try {
      const hash = await bcrypt.hash(password, 10);
      const finalRole = role ?? Role.Customer;
      const result = await this.userModel.create({ email, password: hash, role: finalRole });
      return { message: 'User registered successfully', id: result._id.toString() };
    } catch (error) {
      throw new Error('An error occurred while registering the user');
    }
  }

  async loginUser(email: string, password: string): Promise<string> {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid login credentials');
      }
      const payload = { userId: user._id };
      const token = this.jwtService.sign(payload);
      return token;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('An error occurred while logging in');
    }
  }
}
