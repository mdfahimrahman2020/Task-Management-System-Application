// src/task/dto/update-task.dto.ts

import { IsOptional, IsEnum, IsDateString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from '../enums/task-status.enum'; // ✅ Correct import of TaskStatus

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @IsEnum(TaskStatus)  // ✅ Use the imported TaskStatus enum here
  status?: TaskStatus;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsEnum(['LOW', 'MEDIUM', 'HIGH'])
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}

