import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dtos/createPost.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepositry: Repository<Post>,
    @InjectQueue('posts')
    private postsQueue: Queue,
  ) {}
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const res = await this.postsRepositry.save(createPostDto);
    console.dir(res);
    this;
    const quedPost = await this.postsQueue.add(createPostDto);
    console.log('------STARTED----------');
    console.dir(quedPost);
    return res;
  }
}
