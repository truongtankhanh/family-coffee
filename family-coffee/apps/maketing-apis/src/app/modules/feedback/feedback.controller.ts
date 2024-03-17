import { FindOptionsOrderValue } from 'typeorm';
import { Feedback } from '@family-coffee/entities';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PaginationDto } from './dto/pagination.dto';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { FeedbackService, FeedbackWithPageResponse } from './feedback.service';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  @ApiOperation({ summary: 'Get all feedback' })
  @ApiResponse({ status: 200, description: 'Returns all feedback' })
  async getAllOrders(): Promise<Feedback[]> {
    return this.feedbackService.getAllFeedback();
  }

  @Get('pagination')
  @ApiOperation({ summary: 'Get feedback with page' })
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiResponse({ status: 200, description: 'Returns paginated feedback' })
  async getOrdersWithPage(
    @Query() paginationDto: PaginationDto
  ): Promise<FeedbackWithPageResponse> {
    return this.feedbackService.getFeedbackWithPage(paginationDto);
  }

  @Get('sorted')
  @ApiOperation({ summary: 'Get sorted feedback by date' })
  @ApiQuery({ name: 'order', type: String })
  @ApiResponse({
    status: 200,
    description: 'Returns sorted feedback by date',
  })
  async getSortedOrders(
    @Query('order') order: FindOptionsOrderValue
  ): Promise<Feedback[]> {
    return this.feedbackService.sortFeedbackWithDate(order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an feedback by ID' })
  @ApiResponse({ status: 200, description: 'Returns an feedback by ID' })
  async getOrderById(@Param('id') id: string): Promise<Feedback> {
    return this.feedbackService.getFeedbackById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new feedback' })
  @ApiResponse({ status: 201, description: 'Creates a new feedback' })
  async createOrder(
    @Body() createFeedbackDto: CreateFeedbackDto
  ): Promise<Feedback> {
    return this.feedbackService.createFeedback(createFeedbackDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an feedback by ID' })
  @ApiResponse({ status: 200, description: 'Updates an feedback by ID' })
  async updateOrderById(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto
  ): Promise<Feedback> {
    return this.feedbackService.updateFeedback(id, updateFeedbackDto);
  }

  @Post(':id')
  @ApiOperation({ summary: 'Delete an feedback by ID' })
  @ApiResponse({ status: 200, description: 'Deletes an feedback by ID' })
  async deleteOrderById(@Param('id') id: string): Promise<void> {
    return this.feedbackService.deleteFeedback(id);
  }
}
