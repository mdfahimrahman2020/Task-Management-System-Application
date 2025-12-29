import { Module } from '@nestjs/common';
import { TaskCommentService } from './task-comments.service';
import { TaskCommentController } from './task-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskComment } from './task-comment.entity';
import { Task } from '../task/task.entity';
import { User } from '../user/entity/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskComment, Task, User]), AuthModule],
  providers: [TaskCommentService],
  controllers: [TaskCommentController],
})
export class TaskCommentModule {}
