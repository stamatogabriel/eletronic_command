import { UserRepositoryInterface } from '../../domain/users/user.repository';
import { UserOutput } from './interfaces/user-output';

export class FindByIdUserUseCase {
  constructor(private userRepo: UserRepositoryInterface) {}

  async execute(id: string): Promise<UserOutput> {
    try {
      const user = await this.userRepo.findById(id);

      if (!user) {
        throw 'user not exist';
      }

      return user.toJSON();
    } catch (error) {
      throw `could not find a user: ${error}`;
    }
  }
}
