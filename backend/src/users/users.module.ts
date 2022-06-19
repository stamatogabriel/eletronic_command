import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUserEntity, UserSchema } from 'src/@core/infra/db/users/user.entity';
import { IndexUsersUseCase } from 'src/@core/application/users/index_user.use_case';
import { UserRepositoryInterface } from 'src/@core/domain/users/user.repository';
import { UserMongooseRepository } from 'src/@core/infra/db/users/user-mongoose.repository';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CreateUserUseCase } from 'src/@core/application/users/create_user.use_case';

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
  ],
})
export class UsersModule {}
