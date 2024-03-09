import {Category} from '@family-coffee/entities';
import {ApiTags, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {Controller, Get, Post, Put, Delete, Param, Body} from '@nestjs/common';
import {CategoryService} from './category.service';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';

@ApiTags('category')
@Controller('api/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiOperation({summary: 'Get all categories'})
  @ApiResponse({status: 200, description: 'Returns all items'})
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get an category by ID'})
  @ApiResponse({status: 200, description: 'Returns an category by ID'})
  async getCategoryById(@Param('id') id: number): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  @ApiOperation({summary: 'Create a new category'})
  @ApiResponse({status: 201, description: 'Creates a new category'})
  async createCategory(
    @Body() createItemDto: CreateCategoryDto
  ): Promise<Category> {
    return this.categoryService.createCategory(createItemDto);
  }

  @Put(':id')
  @ApiOperation({summary: 'Update an category by ID'})
  @ApiResponse({status: 200, description: 'Updates an category by ID'})
  async updateCategoryById(
    @Param('id') id: number,
    @Body() updateItemDto: UpdateCategoryDto
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, updateItemDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete an category by ID'})
  @ApiResponse({status: 200, description: 'Deletes an category by ID'})
  async deleteCategoryById(@Param('id') id: number): Promise<void> {
    return this.categoryService.deleteCategory(id);
  }
}
