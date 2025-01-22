// src/posts/posts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { FindJobsDto } from './dto/find-jobs.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async findJobs(queryParams: FindJobsDto) {
    const {
      search,
      status,
      page = 1,
      limit = 10,
      sortBy = 'post_date',
      sortOrder = 'DESC',
    } = queryParams;

    // Build where conditions
    const where: FindOptionsWhere<Post> = {
      post_type: 'job',
    };

    if (status) {
      where.post_status = status;
    } else {
      where.post_status = 'publish'; // Default to published posts
    }

    if (search) {
      where.post_title = ILike(`%${search}%`);
    }

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await this.postsRepository.count({ where });

    // Get paginated results
    const posts = await this.postsRepository.find({
      where,
      relations: ['meta'],
      order: {
        [sortBy]: sortOrder,
      },
      skip,
      take: limit,
    });

    return {
      data: posts,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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
