import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUserEntity, UserSchema } from '../@core/infra/db/users/user.entity';
import { IndexUsersUseCase } from '../@core/application/users/index_user.use_case';
import { CreateUserUseCase } from '../@core/application/users/create_user.use_case';
import { FindByIdUserUseCase } from '../@core/application/users/find_user_by_id.use_case';
import { UpdateUserUseCase } from '../@core/application/users/update_user.use_case';
import { DeleteUserUseCase } from '../@core/application/users/delete_user.use_case';

import { UserRepositoryInterface } from '../@core/domain/users/user.repository';
import { UserMongooseRepository } from '../@core/infra/db/users/user-mongoose.repository';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UserMongooseRepository,
      useFactory: (usersConnection: Model<IUserEntity>) =>
        new UserMongooseRepository(usersConnection),
      inject: [getModelToken('User')],
    },
    {
      provide: IndexUsersUseCase,
      useFactory: (userRepo: UserRepositoryInterface) =>
        new IndexUsersUseCase(userRepo),
      inject: [UserMongooseRepository],
    },
    {
      provide: CreateUserUseCase,
      useFactory: (userRepo: UserRepositoryInterface) =>
        new CreateUserUseCase(userRepo),
      inject: [UserMongooseRepository],
    },
    {
      provide: FindByIdUserUseCase,
      useFactory: (userRepo: UserRepositoryInterface) =>
        new FindByIdUserUseCase(userRepo),
      inject: [UserMongooseRepository],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (userRepo: UserRepositoryInterface) =>
        new UpdateUserUseCase(userRepo),
      inject: [UserMongooseRepository],
    },
    {
      provide: DeleteUserUseCase,
      useFactory: (userRepo: UserRepositoryInterface) =>
        new DeleteUserUseCase(userRepo),
      inject: [UserMongooseRepository],
    },
  ],
})
export class UsersModule {}
