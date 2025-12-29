import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../task/task.entity';  // Import Task entity
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]),AuthModule],  // Import the Task entity to inject the repository
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
