import { User } from './user.entity';

export interface UserRepositoryInterface {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
}
