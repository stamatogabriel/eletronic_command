import { User } from '../../domain/users/user.entity';
import { UserRepositoryInterface } from '../../domain/users/user.repository';
import { UserInput } from './interfaces/user-input';
import { UserOutput } from './interfaces/user-output';

export class CreateUserUseCase {
  constructor(private userRepo: UserRepositoryInterface) {}

  async execute(input: UserInput): Promise<UserOutput> {
    try {
      const user = User.create(input);
      await this.userRepo.create(user);
      return user.toJSON();
    } catch (error) {
      throw { message: `could not possible create a user: ${error}` };
    }
  }
}
