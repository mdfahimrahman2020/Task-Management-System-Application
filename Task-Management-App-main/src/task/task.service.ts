import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createTask(
    createTaskDto: CreateTaskDto,
    userId: number,
  ): Promise<Task> {
    try {
      // Fetch the user from the repository
      const user = await this.userRepository.findOneOrFail({
        where: { id: userId },
      });

      const task = this.taskRepository.create({
        ...createTaskDto,
        user: user,
      });

      return await this.taskRepository.save(task);
    } catch (error) {
      console.error('Error creating task:', error);
      throw new InternalServerErrorException(
        'Internal server error while creating task',
      );
    }
  }

  async getTasks(user: User): Promise<Task[]> {
    return this.taskRepository.find({
      where: { user: { id: user.id } }, // ✅ reference user by ID
      order: { createdAt: 'DESC' },
    });
  }

  async updateTask(
    id: number,
    updateDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!task) throw new NotFoundException('Task not found');

    Object.assign(task, updateDto);
    return this.taskRepository.save(task);
  }

  async deleteTask(id: number, user: User): Promise<{ message: string }> {
    const task = await this.taskRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.taskRepository.remove(task);

    return { message: `Task with ID ${id} has been deleted successfully.` };
  }
}
