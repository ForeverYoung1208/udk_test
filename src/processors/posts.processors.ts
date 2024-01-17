import { Process, Processor } from '@nestjs/bull';
import { CreatePostDto } from '../modules/posts/dtos/createPost.dto';
import { Job } from 'bull';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';

@Processor('posts')
export class PostsProcessor {
  constructor(private readonly postsRepositry: Repository<Post>) {}
  @Process()
  async processPost(job: Job<CreatePostDto>) {
    const res = await this.postsRepositry.save(job.data);
    console.log(`started job ${job.id}`);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 8000));
    console.log('job ---------DONE-----------: ', res);
  }
}
