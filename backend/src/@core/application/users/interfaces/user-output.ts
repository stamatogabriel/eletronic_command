import { Role } from 'src/@core/domain/users/user.entity';
import { Address } from 'src/@core/shared/interfaces/address';

export type UserOutput = {
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
