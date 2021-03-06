import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { DatabaseConnectionService } from './database/connection.service';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: (database: DatabaseConnectionService) => {
        return <MongooseModuleOptions>{
          uri: database.get(),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      inject: [DatabaseConnectionService],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
