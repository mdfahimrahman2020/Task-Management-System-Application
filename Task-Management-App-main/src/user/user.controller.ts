import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUsers() {
    return this.userService.get();
  }

  @Post()
  store(@Body() createUserDto: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument
    return this.userService.create(createUserDto);
  }
  @UseGuards(AuthGuard('jwt'))

  @Patch('/:userId')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.userService.update(updateUserDto, userId);
  }
  @UseGuards(AuthGuard('jwt'))

  @Get('/:userId')
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.show(userId);
  }
  @UseGuards(AuthGuard('jwt'))

  @Delete('/:userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.delete(userId);
  }
}
