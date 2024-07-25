import { Injectable, Logger } from '@nestjs/common';
import { User } from './schemas/user-auth.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    constructor(
      @InjectModel(User.name) private userModel: Model<User>
    ) { }

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userModel.find({});
      return users;
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving users: ${error.message}`,
      );
      throw new Error('An error occurred while retrieving users');
    }
  }

  async getUser({ email, id }: { email?: string, id?: string }): Promise<User|undefined> {
    try {
      if (!email && !id) {
        return;
      }
      const user = email ? await this.userModel.findOne({ email }) : await this.userModel.findById(id);
      return user?.toObject();
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving user: ${error.message}`,
      );
      throw new Error('An error occurred while retrieving user');
    }
  }
}
