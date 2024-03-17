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
import { Comment } from '@family-coffee/entities';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from './dto/pagination.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentService, CommentsWithPageResponse } from './comment.service';

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all comment' })
  @ApiResponse({ status: 200, description: 'Returns all comment' })
  async getAllOrders(): Promise<Comment[]> {
    return this.commentService.getAllComment();
  }

  @Get('pagination')
  @ApiOperation({ summary: 'Get comments with page' })
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiResponse({ status: 200, description: 'Returns paginated comments' })
  async getOrdersWithPage(
    @Query() paginationDto: PaginationDto
  ): Promise<CommentsWithPageResponse> {
    return this.commentService.getCommentsWithPage(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an comment by ID' })
  @ApiResponse({ status: 200, description: 'Returns an comment by ID' })
  async getOrderById(@Param('id') id: string): Promise<Comment> {
    return this.commentService.getCommentById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({ status: 201, description: 'Creates a new comment' })
  async createOrder(
    @Body() createCommentDto: CreateCommentDto
  ): Promise<Comment> {
    return this.commentService.createComment(createCommentDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an comment by ID' })
  @ApiResponse({ status: 200, description: 'Updates an comment by ID' })
  async updateOrderById(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto
  ): Promise<Comment> {
    return this.commentService.updateComment(id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an comment by ID' })
  @ApiResponse({ status: 200, description: 'Deletes an comment by ID' })
  async deleteOrderById(@Param('id') id: string): Promise<void> {
    return this.commentService.deleteComment(id);
  }
}
