import { Address } from 'src/@core/shared/interfaces/address';
import { Role } from '../../domain/users/user.entity';
import { UserRepositoryInterface } from '../../domain/users/user.repository';

export class IndexUsersUseCase {
  constructor(private userRepo: UserRepositoryInterface) {}

  async execute(): Promise<IndexUsersOutput> {
    try {
      const users = await this.userRepo.findAll();
      return users.map((user) => user.toJSON());
    } catch (error) {
      throw { message: `could not possible list users: ${error}` };
    }
  }
}

type IndexUsersOutput = {
  id: string;
  avatar: string;
  address: Address[];
  name: string;
  roles: Role[];
  email: string;
  phone: string;
  password: string;
  passwordResetToken: string | null;
  passwordResetExpires: Date | null;
  created_at?: Date;
  updated_at?: Date;
}[];
