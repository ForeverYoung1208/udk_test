import { Injectable, Logger } from '@nestjs/common';
import { Post } from '../../entities/post.entity';
import { CreatePostDto } from './dtos/createPost.dto';
import { ModuleRef } from '@nestjs/core';
import { getEntityManagerToken } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(private moduleRef: ModuleRef) {}
  private async loadEntityManager(tenantName: string): Promise<EntityManager> {
    return this.moduleRef.get(getEntityManagerToken(`db-${tenantName}`), {
      strict: false,
    });
  }

  async create(post: CreatePostDto): Promise<Post> {
    const em = await this.loadEntityManager('TENANT1');
    return await em.save(Post, post);
  }
}
