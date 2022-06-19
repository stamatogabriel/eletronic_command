import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from 'src/@core/application/users/create_user.use_case';
import { IndexUsersUseCase } from '../@core/application/users/index_user.use_case';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private indexUsers: IndexUsersUseCase,
    private createUser: CreateUserUseCase,
  ) {}

  create(createUserDto: CreateUserDTO) {
    return this.createUser.execute(createUserDto);
  }

  findAll() {
    return this.indexUsers.execute();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
