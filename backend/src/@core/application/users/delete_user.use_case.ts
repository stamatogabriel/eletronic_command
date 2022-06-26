import { UserRepositoryInterface } from '../../domain/users/user.repository';

export class DeleteUserUseCase {
  constructor(private userRepo: UserRepositoryInterface) {}

  async execute(id: string): Promise<unknown> {
    try {
      await this.userRepo.deleteUser(id);
      return { message: 'user successfully deleted' };
    } catch (error) {
      throw { message: `could not possible delete a user: ${error}` };
    }
  }
}
