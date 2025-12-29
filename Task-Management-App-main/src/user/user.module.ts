import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
