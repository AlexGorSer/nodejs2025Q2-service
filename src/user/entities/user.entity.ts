import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @VersionColumn({ default: 1 })
  version: number;

  @CreateDateColumn()
  @Transform(({ value }) => Number(value))
  createdAt: number;

  @UpdateDateColumn()
  @Transform(({ value }) => Number(value))
  updatedAt: number;
}
