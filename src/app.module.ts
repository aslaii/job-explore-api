import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './shared/database.module';
import { User } from './users/entities/user.entity';
import { PostsModule } from 'posts/posts.module';
import { Post } from 'posts/entities/post.entity';
import { PostMeta } from 'posts/entities/post-meta.entity';

/**
 * AppModule is the main module of the application.
 * It imports the SharedModule, DatabaseModule, UsersModule, and AuthModule.
 * The DatabaseModule is configured with the entities of the application.
 */
@Module({
  imports: [
    SharedModule,
    DatabaseModule.forRoot([User, Post, PostMeta]),
    UsersModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
