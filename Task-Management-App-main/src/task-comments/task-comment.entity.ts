/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Task } from '../task/task.entity'; // import Task entity to link comments to tasks
import { User } from '../user/entity/user.entity'; // import User entity to associate comments with users

@Entity()
export class TaskComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Task, (task) => task.comments, { eager: false })
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @ManyToOne(() => User, (user) => user.comments, { eager: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'varchar', nullable: true })
  attachment: string | null; // 👈 Explicitly accept string or null
}
