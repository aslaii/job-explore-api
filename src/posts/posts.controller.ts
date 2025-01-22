// src/posts/posts.controller.ts
import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('jobs')
  @ApiOperation({ summary: 'Get all job posts' })
  @ApiResponse({
    status: 200,
    description: 'Returns all job posts with their meta data',
  })
  async getJobs() {
    return this.postsService.findJobs();
  }
}
