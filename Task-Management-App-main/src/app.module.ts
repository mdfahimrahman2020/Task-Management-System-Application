import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { Task } from './task/task.entity';
import { DashboardModule } from './dashboard/dashboard.module';
import { TaskCommentModule } from './task-comments/task-comments.module';
import { TaskComment } from './task-comments/task-comment.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TaskModule,
    DashboardModule,
    TaskCommentModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // or your DB host
      port: 5432,
      username: 'postgres',
      password: 'qwertyuiop',
      database: 'task',
      entities: [User, Task, TaskComment], // or use entities: [__dirname + '/**/*.entity{.ts,.js}']
      synchronize: true, // ❗set to false in production
    }),
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
