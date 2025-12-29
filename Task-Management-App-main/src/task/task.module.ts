import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User]), UserModule, AuthModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
