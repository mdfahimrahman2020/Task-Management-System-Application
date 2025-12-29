/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskComment } from './task-comment.entity';
import { CreateTaskCommentDto } from './dto/create-task-comment.dto';
import { UpdateTaskCommentDto } from './dto/update-task-comment.dto';
import { Task } from '../task/task.entity'; // import Task entity
import { User } from '../user/entity/user.entity'; // import User entity

@Injectable()
export class TaskCommentService {
  constructor(
    @InjectRepository(TaskComment)
    private taskCommentRepository: Repository<TaskComment>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    createTaskCommentDto: CreateTaskCommentDto,
    file: Express.Multer.File,
  ): Promise<TaskComment> {
    const task = await this.taskRepository.findOne({
      where: { id: createTaskCommentDto.taskId },
    });

    if (!task) throw new NotFoundException('Task not found');

    const taskComment = this.taskCommentRepository.create({
      content: createTaskCommentDto.content,
      task,
      attachment: file?.filename || null,
    });

    return await this.taskCommentRepository.save(taskComment);
  }

  async update(id: number, updateTaskCommentDto: UpdateTaskCommentDto) {
    const taskComment = await this.taskCommentRepository.findOne({
      where: { id },
    });

    if (!taskComment) {
      throw new NotFoundException(`TaskComment with ID ${id} not found`);
    }

    if (updateTaskCommentDto.content) {
      taskComment.content = updateTaskCommentDto.content;
    } else {
      throw new BadRequestException('Content must be provided');
    }

    return await this.taskCommentRepository.save(taskComment);
  }

  async findByTaskId(taskId: number): Promise<TaskComment[]> {
    return await this.taskCommentRepository.find({
      where: { task: { id: taskId } },
      relations: ['task', 'user'],
      order: { createdAt: 'ASC' },
    });
  }

  async delete(id: number) {
    const taskComment = await this.taskCommentRepository.findOne({
      where: { id },
    });

    if (!taskComment) {
      throw new NotFoundException(`TaskComment with ID ${id} not found`);
    }

    await this.taskCommentRepository.remove(taskComment);

    return {
      message: `TaskComment with ID ${id} has been deleted successfully`,
    };
  }

  async getCommentsForTask(taskId: number) {
    return await this.taskCommentRepository.find({
      where: { task: { id: taskId } },
      relations: ['task', 'user'],
    });
  }

  async findAll() {
    return await this.taskCommentRepository.find();
  }
}
