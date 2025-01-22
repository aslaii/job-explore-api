// src/users/entities/user.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { EntityHelper } from './../../common/utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @ApiProperty({ example: 'johndoe' })
  @Column({ name: 'user_login', length: 60, default: '' })
  @Index('user_login_key')
  userLogin: string;

  @ApiProperty({ example: 'john@example.com' })
  @Column({ name: 'user_email', length: 100, default: '' })
  @Index('user_email')
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @Column({ name: 'display_name', length: 250, default: '' })
  displayName: string;

  @Column({ name: 'user_pass', length: 255, default: '' })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ name: 'user_nicename', length: 50, default: '' })
  @Index('user_nicename')
  userNicename: string;

  @Column({ name: 'user_url', length: 100, default: '' })
  userUrl: string;

  @CreateDateColumn({
    name: 'user_registered',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  userRegistered: Date;

  @Column({ name: 'user_activation_key', length: 255, default: '' })
  userActivationKey: string;

  @Column({ name: 'user_status', type: 'int', default: 0 })
  userStatus: number;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
