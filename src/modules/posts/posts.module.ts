import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../../entities/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { BullModule } from '@nestjs/bull';
import { PostsProcessor } from './queue/posts.processors';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    BullModule.registerQueue({ name: 'posts', processors:  }),
  ],
  providers: [PostsController, PostsService, PostsProcessor],
  exports: [PostsController, PostsService],
})
export class PostsModule {}
