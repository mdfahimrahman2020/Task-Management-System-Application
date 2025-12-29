import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  name: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
