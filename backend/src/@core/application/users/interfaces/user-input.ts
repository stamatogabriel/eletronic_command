import { Role } from 'src/@core/domain/users/user.entity';
import { Address } from 'src/@core/shared/interfaces/address';

export type UserInput = {
  avatar?: string;
  address?: Address[];
  name: string;
  roles: Role[];
  email: string;
  phone: string;
  password: string;
};
