import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PostMeta } from './post-meta.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('posts')
export class Post {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  ID: number;

  @ApiProperty({ example: 1 })
  @Column()
  post_author: number;

  @ApiProperty({ example: '2024-01-23T00:00:00.000Z' })
  @Column()
  post_date: Date;

  @ApiProperty({ example: 'Senior Software Engineer Position' })
  @Column('text')
  post_title: string;

  @ApiProperty({ example: 'We are looking for a senior software engineer...' })
  @Column('text')
  post_content: string;

  @ApiProperty({ example: 'Short description of the job position' })
  @Column('text')
  post_excerpt: string;

  @ApiProperty({ example: 'publish', enum: ['publish', 'draft', 'private'] })
  @Column({ length: 20, default: 'publish' })
  post_status: string;

  @ApiProperty({ example: 'job', enum: ['job', 'post', 'page'] })
  @Column({ length: 20 })
  post_type: string;

  @OneToMany(() => PostMeta, (postMeta) => postMeta.post)
  meta: PostMeta[];
}
