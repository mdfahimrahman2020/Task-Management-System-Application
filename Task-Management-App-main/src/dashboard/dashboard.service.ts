import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../task/task.entity'; // Import Task entity
import { Repository } from 'typeorm';
import { MoreThanOrEqual } from 'typeorm';
import { LessThan, Not } from 'typeorm';
import { TaskStatus } from 'src/task/enums/task-status.enum';
import { Between } from 'typeorm';
import * as dayjs from 'dayjs';
import { MoreThan } from 'typeorm';


@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>, // Injecting the Task repository
  ) {}

  // Get task summary (total tasks, completed tasks, pending tasks, etc.)
  async getTaskSummary() {
    const totalTasks = await this.taskRepository.count();
    const completedTasks = await this.taskRepository.count({
      where: { status: 'completed' },
    });
    const inProgressTasks = await this.taskRepository.count({
      where: { status: 'in-progress' },
    });
    const pendingTasks = await this.taskRepository.count({
      where: { status: 'pending' },
    });

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      pendingTasks,
    };
  }

  // Get upcoming tasks (tasks with a due date coming up)
  async getUpcomingTasks() {
    const tasks = await this.taskRepository.find({
      where: { dueDate: MoreThanOrEqual(new Date()) }, // Find tasks with dueDate greater than current date
      order: { dueDate: 'ASC' }, // Order them by due date
    });
    return tasks;
  }

  async getOverdueTasks(userId: number) {
    const today = new Date();

    return await this.taskRepository.find({
      where: {
        user: { id: userId },
        dueDate: LessThan(today),
        status: Not(TaskStatus.COMPLETED),
      },
      order: { dueDate: 'ASC' },
    });
  }

  async getPriorityStats() {
    const low = await this.taskRepository.count({ where: { priority: 'LOW' } });
    const medium = await this.taskRepository.count({
      where: { priority: 'MEDIUM' },
    });
    const high = await this.taskRepository.count({
      where: { priority: 'HIGH' },
    });

    return { low, medium, high };
  }

  async getDailyTaskCounts() {
    const today = dayjs();
    const sevenDaysAgo = today.subtract(6, 'day'); // Including today
  
    const result: { date: string; count: number }[] = []; // ✅ Fix here
  
    for (let i = 0; i < 7; i++) {
      const date = sevenDaysAgo.add(i, 'day');
      const start = date.startOf('day').toDate();
      const end = date.endOf('day').toDate();
  
      const count = await this.taskRepository.count({
        where: {
          createdAt: Between(start, end),
        },
      });
  
      result.push({
        date: date.format('YYYY-MM-DD'),
        count,
      });
    }
  
    return result;
  }

  async getRecentCompletedTasks(): Promise<Task[]> {
    const sevenDaysAgo = dayjs().subtract(7, 'day').toDate();
  
    return this.taskRepository.find({
      where: {
        status: TaskStatus.COMPLETED,
        updatedAt: MoreThan(sevenDaysAgo),  // ✅ Using MoreThan for date filtering
      },
      order: { updatedAt: 'DESC' },  // ✅ Ordering tasks by updatedAt
    });
  }
}