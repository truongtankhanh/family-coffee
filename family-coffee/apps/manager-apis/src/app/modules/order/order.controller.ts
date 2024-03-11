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
import { Order } from '@family-coffee/entities';
import { FindOptionsOrderValue } from 'typeorm';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from './dto/pagination.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService, OrdersWithPageResponse } from './order.service';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Returns all order' })
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Get('pagination')
  @ApiOperation({ summary: 'Get orders with page' })
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiResponse({ status: 200, description: 'Returns paginated orders' })
  async getOrdersWithPage(
    @Query() paginationDto: PaginationDto
  ): Promise<OrdersWithPageResponse> {
    return this.orderService.getOrdersWithPage(paginationDto);
  }

  @Get('sorted')
  @ApiOperation({ summary: 'Get sorted orders by date' })
  @ApiQuery({ name: 'order', type: String })
  @ApiResponse({
    status: 200,
    description: 'Returns sorted orders by date',
  })
  async getSortedOrders(
    @Query('order') order: FindOptionsOrderValue
  ): Promise<Order[]> {
    return this.orderService.sortOrdersWithDate(order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({ status: 200, description: 'Returns an order by ID' })
  async getOrderById(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOrderById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Creates a new order' })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiResponse({ status: 200, description: 'Updates an order by ID' })
  async updateOrderById(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto
  ): Promise<Order> {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiResponse({ status: 200, description: 'Deletes an order by ID' })
  async deleteOrderById(@Param('id') id: string): Promise<void> {
    return this.orderService.deleteOrder(id);
  }
}
