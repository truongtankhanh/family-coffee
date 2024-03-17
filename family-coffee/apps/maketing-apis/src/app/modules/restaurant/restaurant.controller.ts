import { FindOptionsOrderValue } from 'typeorm';
import { Restaurant } from '@family-coffee/entities';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  RestaurantService,
  RestaurantWithPageResponse,
} from './restaurant.service';
import { PaginationDto } from './dto/pagination.dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@ApiTags('Restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  @ApiOperation({ summary: 'Get all restaurant' })
  @ApiResponse({ status: 200, description: 'Returns all restaurant' })
  async getAllRestaurant(): Promise<Restaurant[]> {
    return this.restaurantService.getAllRestaurant();
  }

  @Get('pagination')
  @ApiOperation({ summary: 'Get restaurant with page' })
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiResponse({ status: 200, description: 'Returns paginated restaurant' })
  async getRestaurantWithPage(
    @Query() paginationDto: PaginationDto
  ): Promise<RestaurantWithPageResponse> {
    return this.restaurantService.getRestaurantWithPage(paginationDto);
  }

  @Get('sorted')
  @ApiOperation({ summary: 'Get sorted restaurant by date' })
  @ApiQuery({ name: 'order', type: String })
  @ApiResponse({
    status: 200,
    description: 'Returns sorted restaurant by date',
  })
  async getSortedRestaurant(
    @Query('order') order: FindOptionsOrderValue
  ): Promise<Restaurant[]> {
    return this.restaurantService.sortRestaurantWithDate(order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an restaurant by ID' })
  @ApiResponse({ status: 200, description: 'Returns an restaurant by ID' })
  async getRestaurantById(@Param('id') id: string): Promise<Restaurant> {
    return this.restaurantService.getRestaurantById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new restaurant' })
  @ApiResponse({ status: 201, description: 'Creates a new restaurant' })
  async createRestaurant(
    @Body() createRestaurantDto: CreateRestaurantDto
  ): Promise<Restaurant> {
    return this.restaurantService.createRestaurant(createRestaurantDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an restaurant by ID' })
  @ApiResponse({ status: 200, description: 'Updates an restaurant by ID' })
  async updateRestaurantById(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto
  ): Promise<Restaurant> {
    return this.restaurantService.updateRestaurant(id, updateRestaurantDto);
  }

  @Post(':id')
  @ApiOperation({ summary: 'Delete an restaurant by ID' })
  @ApiResponse({ status: 200, description: 'Deletes an restaurant by ID' })
  async deleteRestaurantById(@Param('id') id: string): Promise<void> {
    return this.restaurantService.deleteRestaurant(id);
  }
}
