import { Process, Processor } from '@nestjs/bull';
import { CreatePostDto } from '../modules/posts/dtos/createPost.dto';
import { Job } from 'bull';
import { PostsService } from '../modules/posts/posts.service';

@Processor('posts')
export class PostsProcessor {
  constructor(private readonly postsService: PostsService) {}
  @Process()
  async processPost(job: Job<CreatePostDto>) {
    console.log(`started job processor for job id  ${job.id}`);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 8000));
    const res = await this.postsService.create(job.data);
    console.log('job ---------DONE-----------: ', res);
  }
}
