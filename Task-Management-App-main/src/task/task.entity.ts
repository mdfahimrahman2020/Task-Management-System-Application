/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/entity/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'in-progress' | 'completed';

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'enum', enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'MEDIUM' })
  priority: 'LOW' | 'MEDIUM' | 'HIGH';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
    comments: any;
}
