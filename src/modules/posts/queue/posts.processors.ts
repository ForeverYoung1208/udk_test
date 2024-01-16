import { Process, Processor } from '@nestjs/bull';
import { CreatePostDto } from '../dtos/createPost.dto';
import { Job } from 'bull';

@Processor('posts')
export class PostsProcessor {
  @Process()
  async processPost(job: Job<CreatePostDto>) {
    console.log('job ---------DONE-----------: ');
    console.dir(job);
  }
}
