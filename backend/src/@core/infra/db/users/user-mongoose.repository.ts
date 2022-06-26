import { User } from '../../../domain/users/user.entity';
import { UserRepositoryInterface } from '../../../domain/users/user.repository';
import { IUserEntity } from './user.entity';
import { Model } from 'mongoose';

export class UserMongooseRepository implements UserRepositoryInterface {
  constructor(private userRepo: Model<IUserEntity>) {}

  async findAll(): Promise<User[]> {
    try {
      return this.userRepo.find();
    } catch (error) {
      throw error;
    }
  }

  async create(user: User): Promise<User> {
    try {
      return this.userRepo.create(user.toJSON());
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      return this.userRepo.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    try {
      return this.userRepo.findByIdAndUpdate(id, user, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string): Promise<unknown> {
    try {
      return this.userRepo.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
