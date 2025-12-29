import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  get(): Promise<User[]> {
    return this.userRepository.find();
  }
  create(createUserDto: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.userRepository.save(createUserDto);
  }

  update(updateUserDto: UpdateUserDto, userId: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
    return this.userRepository.update(userId, updateUserDto);
  }

  show(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  delete(userId: number) {
    return this.userRepository.delete(userId);
  }
}
