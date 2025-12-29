/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /*@Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.taskService.createTask(createTaskDto, req.user);
  }*/

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req: any) {
    return this.taskService.createTask(createTaskDto, req.user.sub); // 👈 Correct
  }

  @Get()
  findAll(@Request() req) {
    return this.taskService.getTasks(req.user);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ) {
    return this.taskService.updateTask(id, updateTaskDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.taskService.deleteTask(id, req.user);
  }
}
