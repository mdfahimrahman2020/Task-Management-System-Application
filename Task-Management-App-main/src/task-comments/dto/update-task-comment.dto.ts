import { IsString, IsOptional } from 'class-validator';

export class UpdateTaskCommentDto {
  @IsOptional() // If the field is optional, we use @IsOptional
  @IsString()
  content?: string;
}
