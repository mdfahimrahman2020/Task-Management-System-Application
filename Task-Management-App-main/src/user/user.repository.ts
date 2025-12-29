/* eslint-disable @typescript-eslint/no-unsafe-argument */
// src/user/user.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { User } from './entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // You can add custom queries or methods here if needed
}
