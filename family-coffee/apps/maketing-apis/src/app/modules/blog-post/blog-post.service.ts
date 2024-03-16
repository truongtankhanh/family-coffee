import { FindOptionsOrderValue, Repository } from 'typeorm';
import { BlogPost } from '@family-coffee/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginationDto } from './dto/pagination.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

export interface BlogsWithPageResponse {
  nextPage: number;
  data: BlogPost[];
}

@Injectable()
export class BlogPostService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogRepo: Repository<BlogPost>
  ) {}

  async getAllBlog(): Promise<BlogPost[]> {
    try {
      return await this.blogRepo.find({ withDeleted: false });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async getBlogsWithPage(
    paginationDto: PaginationDto
  ): Promise<BlogsWithPageResponse> {
    const { page, limit } = paginationDto;
    const skippedItems = (page - 1) * limit;

    try {
      const data = await this.blogRepo.find({
        skip: skippedItems,
        take: limit,
        withDeleted: false,
      });

      return {
        nextPage: page + 1,
        data,
      };
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async sortBlogsWithDate(option: FindOptionsOrderValue) {
    try {
      return await this.blogRepo.find({
        order: {
          publishedAt: option,
        },
        withDeleted: false,
      });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async getBlogById(id: string): Promise<BlogPost> {
    try {
      const blog = await this.blogRepo.findOne({ where: { id } });

      if (!blog) {
        throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
      }

      return blog;
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async createBlog(createBlogDto: CreateBlogDto): Promise<BlogPost> {
    try {
      const blog = new BlogPost();
      blog.title = createBlogDto.title;
      blog.content = createBlogDto.content;
      blog.author = createBlogDto.author;
      blog.category = createBlogDto.category;
      blog.publishedAt = new Date(createBlogDto.published_at);

      const newBlog = this.blogRepo.create(blog);
      return await this.blogRepo.save(newBlog);
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async updateBlog(
    id: string,
    updateBlogDto: UpdateBlogDto
  ): Promise<BlogPost> {
    try {
      const blog = await this.getBlogById(id);

      const updatedItem = Object.assign(blog, updateBlogDto);
      return await this.blogRepo.save(updatedItem);
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async deleteBlog(id: string): Promise<void> {
    try {
      const blog = await this.getBlogById(id);

      await this.blogRepo.remove(blog);
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }
}
