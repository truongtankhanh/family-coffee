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
import { Customer } from '@family-coffee/entities';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PaginationDto } from './dto/pagination.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerService, CustomersWithPageResponse } from './customer.service';

@ApiTags('Customers')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Returns all customer' })
  async getAllCustomers(): Promise<Customer[]> {
    return this.customerService.getAllCustomers();
  }

  @Get('pagination')
  @ApiOperation({ summary: 'Get orders with page' })
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiResponse({ status: 200, description: 'Returns paginated orders' })
  async getCustomersWithPage(
    @Query() paginationDto: PaginationDto
  ): Promise<CustomersWithPageResponse> {
    return this.customerService.getCustomersWithPage(paginationDto);
  }

  @Get('sorted')
  @ApiOperation({ summary: 'Get sorted orders by date' })
  @ApiQuery({ name: 'order', type: String })
  @ApiResponse({
    status: 200,
    description: 'Returns sorted orders by date',
  })
  async getSortedCustomers(
    @Query('order') order: FindOptionsOrderValue
  ): Promise<Customer[]> {
    return this.customerService.sortCustomersWithName(order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an customer by ID' })
  @ApiResponse({ status: 200, description: 'Returns an customer by ID' })
  async getCustomerById(@Param('id') id: string): Promise<Customer> {
    return this.customerService.getCustomerById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'Creates a new customer' })
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto
  ): Promise<Customer> {
    return this.customerService.createCustomer(createCustomerDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an customer by ID' })
  @ApiResponse({ status: 200, description: 'Updates an customer by ID' })
  async updateCustomerById(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ): Promise<Customer> {
    return this.customerService.updateCustomer(id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an customer by ID' })
  @ApiResponse({ status: 200, description: 'Deletes an customer by ID' })
  async deleteCustomerById(@Param('id') id: string): Promise<void> {
    return this.customerService.deleteCustomer(id);
  }
}
