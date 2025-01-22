import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindJobsDto {
  @ApiProperty({ required: false, example: 'developer' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    required: false,
    example: 'publish',
    enum: ['publish', 'draft', 'private'],
  })
  @IsOptional()
  @IsEnum(['publish', 'draft', 'private'])
  status?: string;

  @ApiProperty({ required: false, minimum: 1, default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page?: number = 1;

  @ApiProperty({ required: false, minimum: 1, maximum: 100, default: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => parseInt(value))
  limit?: number = 10;

  @ApiProperty({
    required: false,
    example: 'post_date',
    enum: ['post_date', 'post_title'],
  })
  @IsOptional()
  @IsEnum(['post_date', 'post_title'])
  sortBy?: string = 'post_date';

  @ApiProperty({ required: false, example: 'DESC', enum: ['ASC', 'DESC'] })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
