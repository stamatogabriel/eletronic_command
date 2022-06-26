import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from '../@core/application/users/create_user.use_case';
import { IndexUsersUseCase } from '../@core/application/users/index_user.use_case';
import { FindByIdUserUseCase } from '../@core/application/users/find_user_by_id.use_case';
import { UpdateUserUseCase } from '../@core/application/users/update_user.use_case';
import { DeleteUserUseCase } from '../@core/application/users/delete_user.use_case';

import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private indexUsers: IndexUsersUseCase,
    private createUser: CreateUserUseCase,
    private findByIdUser: FindByIdUserUseCase,
    private updateUser: UpdateUserUseCase,
    private deleteUser: DeleteUserUseCase,
  ) {}

  create(createUserDto: CreateUserDTO) {
    return this.createUser.execute(createUserDto);
  }

  findAll() {
    return this.indexUsers.execute();
  }

  findOne(id: string) {
    return this.findByIdUser.execute(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.updateUser.execute(id, updateUserDto);
  }

  remove(id: string) {
    return this.deleteUser.execute(id);
  }
}
