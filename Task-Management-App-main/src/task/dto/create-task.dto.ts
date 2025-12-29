// src/task/dto/create-task.dto.ts

import { IsNotEmpty, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum'; // ✅ Correct import of TaskStatus

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

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
