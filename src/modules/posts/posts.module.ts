import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [],
  providers: [PostsController, PostsService],
  exports: [PostsController, PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
