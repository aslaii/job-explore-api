// src/posts/posts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findJobById(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: {
        ID: id,
        post_type: 'job',
        post_status: 'publish',
      },
      relations: ['meta'],
    });

    if (!post) {
      throw new NotFoundException(`Job post with ID ${id} not found`);
    }

    return post;
  }
}
