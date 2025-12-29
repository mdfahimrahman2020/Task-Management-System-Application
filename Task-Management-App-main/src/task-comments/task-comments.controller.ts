/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  Patch,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskCommentService } from './task-comments.service';
import { CreateTaskCommentDto } from './dto/create-task-comment.dto';
import { UpdateTaskCommentDto } from './dto/update-task-comment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('task-comments')
@UseGuards(JwtAuthGuard)
export class TaskCommentController {
  constructor(private readonly taskCommentService: TaskCommentService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @Body() createTaskCommentDto: CreateTaskCommentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.taskCommentService.create(createTaskCommentDto, file);
  }

  @Get('task/:taskId')
  async getCommentsForTask(@Param('taskId', ParseIntPipe) taskId: number) {
    return await this.taskCommentService.getCommentsForTask(taskId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskCommentDto: UpdateTaskCommentDto,
  ) {
    return await this.taskCommentService.update(id, updateTaskCommentDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.taskCommentService.delete(id);
  }

  @Get()
  async getAllTaskComments() {
    return await this.taskCommentService.findAll();
  }
}
