import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FindOptionsOrderValue } from 'typeorm';
import { Product } from '@family-coffee/entities';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from './dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService, ProductsWithPageResponse } from './product.service';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Returns all product' })
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get('pagination')
  @ApiOperation({ summary: 'Get products with page' })
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiResponse({ status: 200, description: 'Returns paginated products' })
  async getProductsWithPage(
    @Query() paginationDto: PaginationDto
  ): Promise<ProductsWithPageResponse> {
    return this.productService.getProductsWithPage(paginationDto);
  }

  @Get('sorted')
  @ApiOperation({ summary: 'Get sorted products by name' })
  @ApiQuery({ name: 'order', type: String })
  @ApiResponse({
    status: 200,
    description: 'Returns sorted products by name',
  })
  async getSortedProducts(
    @Query('order') order: FindOptionsOrderValue
  ): Promise<Product[]> {
    return this.productService.sortProductsWithName(order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an product by ID' })
  @ApiResponse({ status: 200, description: 'Returns an product by ID' })
  async getProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Creates a new product' })
  async createProduct(
    @Body() createProductDto: CreateProductDto
  ): Promise<Product> {
    return this.productService.createProduct(createProductDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an product by ID' })
  @ApiResponse({ status: 200, description: 'Updates an product by ID' })
  async updateProductById(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<Product> {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an product by ID' })
  @ApiResponse({ status: 200, description: 'Deletes an product by ID' })
  async deleteProductById(@Param('id') id: string): Promise<void> {
    return this.productService.deleteProduct(id);
  }
}
