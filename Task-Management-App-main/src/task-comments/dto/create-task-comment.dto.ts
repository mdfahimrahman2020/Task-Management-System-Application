import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  taskId: number;
}
