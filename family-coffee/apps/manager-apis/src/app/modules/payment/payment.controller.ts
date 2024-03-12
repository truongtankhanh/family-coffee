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
import { Payment } from '@family-coffee/entities';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from './dto/pagination.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentService, PaymentsWithPageResponse } from './payment.service';

@ApiTags('Payments')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Returns all payment' })
  async getAllPayments(): Promise<Payment[]> {
    return this.paymentService.getAllPayments();
  }

  @Get('pagination')
  @ApiOperation({ summary: 'Get orders with page' })
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiResponse({ status: 200, description: 'Returns paginated orders' })
  async getPaymentsWithPage(
    @Query() paginationDto: PaginationDto
  ): Promise<PaymentsWithPageResponse> {
    return this.paymentService.getPaymentsWithPage(paginationDto);
  }

  @Get('sorted')
  @ApiOperation({ summary: 'Get sorted orders by date' })
  @ApiQuery({ name: 'order', type: String })
  @ApiResponse({
    status: 200,
    description: 'Returns sorted orders by date',
  })
  async getSortedPayments(
    @Query('order') order: FindOptionsOrderValue
  ): Promise<Payment[]> {
    return this.paymentService.sortPaymentsWithDate(order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an payment by ID' })
  @ApiResponse({ status: 200, description: 'Returns an payment by ID' })
  async getPaymentById(@Param('id') id: string): Promise<Payment> {
    return this.paymentService.getPaymentById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({ status: 201, description: 'Creates a new payment' })
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto
  ): Promise<Payment> {
    return this.paymentService.createPayment(createPaymentDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an payment by ID' })
  @ApiResponse({ status: 200, description: 'Updates an payment by ID' })
  async updatePaymentById(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto
  ): Promise<Payment> {
    return this.paymentService.updatePayment(id, updatePaymentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an payment by ID' })
  @ApiResponse({ status: 200, description: 'Deletes an payment by ID' })
  async deletePaymentById(@Param('id') id: string): Promise<void> {
    return this.paymentService.deletePayment(id);
  }
}
