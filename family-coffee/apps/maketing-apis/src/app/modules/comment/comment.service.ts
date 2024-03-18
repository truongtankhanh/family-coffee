import { Repository } from 'typeorm';
import { Comment } from '@family-coffee/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpExceptionService } from '@family-coffee/services';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PaginationDto } from './dto/pagination.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

export interface CommentsWithPageResponse {
  nextPage: number;
  data: Comment[];
}

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    private readonly httpExceptionService: HttpExceptionService
  ) {}

  async getAllComment(): Promise<Comment[]> {
    try {
      return await this.commentRepo.find({ withDeleted: false });
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async getCommentsWithPage(
    paginationDto: PaginationDto
  ): Promise<CommentsWithPageResponse> {
    const { page, limit } = paginationDto;
    const skippedItems = (page - 1) * limit;

    try {
      const data = await this.commentRepo.find({
        skip: skippedItems,
        take: limit,
        withDeleted: false,
      });

      return {
        nextPage: page + 1,
        data,
      };
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async getCommentById(id: string): Promise<Comment> {
    try {
      const comment = await this.commentRepo.findOne({ where: { id } });

      if (!comment) {
        throw new HttpException(`Comment ${id} not found`, HttpStatus.NOT_FOUND);
      }

      return comment;
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const comment = new Comment();
      comment.commenterName = createCommentDto.commenter_name;
      comment.commentContent = createCommentDto.comment_content;
      comment.commentedAt = new Date(createCommentDto.commented_at);
      comment.blogId = createCommentDto.blog_id;

      const newOrder = this.commentRepo.create(comment);
      return await this.commentRepo.save(newOrder);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async updateComment(
    id: string,
    updateCommentDto: UpdateCommentDto
  ): Promise<Comment> {
    try {
      const comment = await this.getCommentById(id);

      const updatedItem = Object.assign(comment, updateCommentDto);
      return await this.commentRepo.save(updatedItem);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async deleteComment(id: string): Promise<void> {
    try {
      const comment = await this.getCommentById(id);

      await this.commentRepo.remove(comment);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }
}
