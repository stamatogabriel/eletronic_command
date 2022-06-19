import { Address } from '../../shared/interfaces/address';
import { User, Role } from '../../domain/users/user.entity';
import { UserRepositoryInterface } from '../../domain/users/user.repository';

export class CreateUserUseCase {
  constructor(private userRepo: UserRepositoryInterface) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const user = new User(input);
    await this.userRepo.create(user);
    return user.toJSON();
  }
}

type CreateUserInput = {
  avatar?: string;
  address?: Address[];
  name: string;
  roles: Role[];
  email: string;
  phone: string;
  password: string;
};

type CreateUserOutput = {
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
};
