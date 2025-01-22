// src/posts/posts.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async findJobs(): Promise<Post[]> {
    return this.postsRepository.find({
      where: {
        post_type: 'job',
        post_status: 'publish',
      },
      relations: ['meta'],
      order: {
        post_date: 'DESC',
      },
    });
  }
}
