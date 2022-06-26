import { UserRepositoryInterface } from '../../domain/users/user.repository';
import { UserInput } from './interfaces/user-input';
import { UserOutput } from './interfaces/user-output';

export class UpdateUserUseCase {
  constructor(private userRepo: UserRepositoryInterface) {}

  async execute(id: string, input: Partial<UserInput>): Promise<UserOutput> {
    try {
      const user = await this.userRepo.updateUser(id, input);

      if (!user) {
        throw 'user not exist';
      }

      return user.toJSON();
    } catch (error) {
      throw { message: `could not possible update user: ${error}` };
    }
  }
}
