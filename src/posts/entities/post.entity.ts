import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PostMeta } from './post-meta.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  post_author: number;

  @Column()
  post_date: Date;

  @Column()
  post_date_gmt: Date;

  @Column('text')
  post_content: string;

  @Column('text')
  post_title: string;

  @Column('text')
  post_excerpt: string;

  @Column({ length: 20, default: 'publish' })
  post_status: string;

  @Column({ length: 20 })
  post_type: string;

  @OneToMany(() => PostMeta, (postMeta) => postMeta.post)
  meta: PostMeta[];
}
