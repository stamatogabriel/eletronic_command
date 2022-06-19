import { User } from '../../../domain/users/user.entity';
import { UserRepositoryInterface } from '../../../domain/users/user.repository';
import { IUserEntity } from './user.entity';
import { Model } from 'mongoose';

export class UserMongooseRepository implements UserRepositoryInterface {
  constructor(private userRepo: Model<IUserEntity>) {}

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async create(user: User): Promise<User> {
    return this.userRepo.create(user.toJSON());
  }
}
