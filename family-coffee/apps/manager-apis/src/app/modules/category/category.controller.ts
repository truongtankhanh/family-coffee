import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { FindOptionsOrderValue } from 'typeorm';
import { Category, Product } from '@family-coffee/entities';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import {
  CategoriesWithPageResponse,
  CategoryService,
} from './category.service';
import { CreateCategoryDto, UpdateCategoryDto, PaginationDto } from './dto';

@ApiTags('Categories')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Returns all category' })
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get('pagination')
  @ApiOperation({ summary: 'Get categories with page' })
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'limit', type: Number })
  @ApiResponse({ status: 200, description: 'Returns paginated categories' })
  async getCategoriesWithPage(
    @Query() paginationDto: PaginationDto
  ): Promise<CategoriesWithPageResponse> {
    return this.categoryService.getCategoriesWithPage(paginationDto);
  }

  @Get('sorted')
  @ApiOperation({ summary: 'Get sorted categories by name' })
  @ApiQuery({ name: 'order', type: String })
  @ApiResponse({
    status: 200,
    description: 'Returns sorted categories by name',
  })
  async getSortedCategories(
    @Query('order') order: FindOptionsOrderValue
  ): Promise<Category[]> {
    return this.categoryService.sortCategoriesWithName(order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an category by ID' })
  @ApiResponse({ status: 200, description: 'Returns an category by ID' })
  async getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Get(':id/products')
  @ApiOperation({ summary: 'Get a list of products by category' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of products by category',
  })
  async getProductByCategoryId(@Param('id') id: string): Promise<Product[]> {
    return this.categoryService.getProductByCategoryId(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Creates a new category' })
  async createCategory(
    @Body() createItemDto: CreateCategoryDto
  ): Promise<Category> {
    return this.categoryService.createCategory(createItemDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an category by ID' })
  @ApiResponse({ status: 200, description: 'Updates an category by ID' })
  async updateCategoryById(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateCategoryDto
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, updateItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an category by ID' })
  @ApiResponse({ status: 200, description: 'Deletes an category by ID' })
  async deleteCategoryById(@Param('id') id: string): Promise<void> {
    return this.categoryService.deleteCategory(id);
  }
}
