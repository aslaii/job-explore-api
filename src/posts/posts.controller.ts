// src/posts/posts.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('jobs')
  @ApiOperation({
    summary: 'Get all job posts',
    description: 'Retrieve all job listings with their meta information',
  })
  @ApiOkResponse({
    description: 'List of job posts retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          ID: { type: 'number' },
          post_title: { type: 'string' },
          post_content: { type: 'string' },
          post_excerpt: { type: 'string' },
          post_date: { type: 'string', format: 'date-time' },
          meta: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                meta_key: { type: 'string' },
                meta_value: { type: 'string' },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async getJobs() {
    return this.postsService.findJobs();
  }

  @Get('jobs/:id')
  @ApiOperation({
    summary: 'Get job post details',
    description: 'Retrieve detailed information about a specific job post',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Job post ID',
    required: true,
  })
  @ApiOkResponse({
    description: 'Job post details retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        ID: { type: 'number' },
        post_author: { type: 'number' },
        post_date: { type: 'string', format: 'date-time' },
        post_title: { type: 'string' },
        post_content: { type: 'string' },
        post_excerpt: { type: 'string' },
        post_status: { type: 'string', enum: ['publish', 'draft', 'private'] },
        post_type: { type: 'string', enum: ['job'] },
        meta: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              meta_id: { type: 'number' },
              meta_key: { type: 'string' },
              meta_value: { type: 'string' },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Job post not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async getJobDetails(@Param('id') id: number) {
    return this.postsService.findJobById(id);
  }
}
