// src/posts/entities/post-meta.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity('postmeta')
export class PostMeta {
  @PrimaryGeneratedColumn()
  meta_id: number;

  @Column()
  post_id: number;

  @Column({ length: 255, nullable: true })
  meta_key: string;

  @Column('text', { nullable: true })
  meta_value: string;

  @ManyToOne(() => Post, (post) => post.meta)
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
