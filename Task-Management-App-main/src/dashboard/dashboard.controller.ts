/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Req } from '@nestjs/common';


@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // Endpoint for task summary (total, completed, pending tasks)
  @Get('summary')
  async getSummary() {
    const summary = await this.dashboardService.getTaskSummary();
    return summary;
  }

  // Endpoint for upcoming tasks (sorted by due date)
  @Get('upcoming')
  async getUpcomingTasks() {
    const tasks = await this.dashboardService.getUpcomingTasks();
    return tasks;
  }

  @Get('overdue-tasks')
  async getOverdueTasks(@Req() req) {
    const userId = req.user.id;
    return this.dashboardService.getOverdueTasks(userId);
  }

  @Get('priority-stats')
  async getPriorityStats() {
    return await this.dashboardService.getPriorityStats();
  }

  @Get('daily-counts')
  async getDailyTaskCounts() {
    return await this.dashboardService.getDailyTaskCounts();
  }

  @Get('recent-completed')
  async getRecentCompletedTasks() {
    return this.dashboardService.getRecentCompletedTasks();
  }
}
