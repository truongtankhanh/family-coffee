import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { FindOptionsOrderValue } from 'typeorm';
import { BlogPost } from '@family-coffee/entities';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from './dto/pagination.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogPostService, BlogsWithPageResponse } from './blog-post.service';

@ApiTags('BlogPosts')
@Controller('blog-post')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @Get()
  @ApiOperation({ summary: 'Get all blog' })
  @ApiResponse({ status: 200, description: 'Returns all blog' })
  async getAllOrders(): Promise<BlogPost[]> {
    return this.blogPostService.getAllBlog();
  }

  @Get('pagination')
  @ApiOperation({ summary: 'Get orders with page' })
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiResponse({ status: 200, description: 'Returns paginated orders' })
  async getOrdersWithPage(
    @Query() paginationDto: PaginationDto
  ): Promise<BlogsWithPageResponse> {
    return this.blogPostService.getBlogsWithPage(paginationDto);
  }

  @Get('sorted')
  @ApiOperation({ summary: 'Get sorted orders by date' })
  @ApiQuery({ name: 'blog', type: String })
  @ApiResponse({
    status: 200,
    description: 'Returns sorted orders by date',
  })
  async getSortedOrders(
    @Query('order') order: FindOptionsOrderValue
  ): Promise<BlogPost[]> {
    return this.blogPostService.sortBlogsWithDate(order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an blog by ID' })
  @ApiResponse({ status: 200, description: 'Returns an blog by ID' })
  async getOrderById(@Param('id') id: string): Promise<BlogPost> {
    return this.blogPostService.getBlogById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new blog' })
  @ApiResponse({ status: 201, description: 'Creates a new blog' })
  async createOrder(@Body() createBlogDto: CreateBlogDto): Promise<BlogPost> {
    return this.blogPostService.createBlog(createBlogDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an blog by ID' })
  @ApiResponse({ status: 200, description: 'Updates an blog by ID' })
  async updateOrderById(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto
  ): Promise<BlogPost> {
    return this.blogPostService.updateBlog(id, updateBlogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an blog by ID' })
  @ApiResponse({ status: 200, description: 'Deletes an blog by ID' })
  async deleteOrderById(@Param('id') id: string): Promise<void> {
    return this.blogPostService.deleteBlog(id);
  }
}
