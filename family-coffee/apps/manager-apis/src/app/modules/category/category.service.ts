import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, Product } from '@family-coffee/entities';
import { FindOptionsOrderValue, Repository } from 'typeorm';
import { HttpExceptionService } from '@family-coffee/services';

import { PaginationDto } from './dto/pagination.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

export interface CategoriesWithPageResponse {
  nextPage: number;
  data: Category[];
}

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    private readonly httpExceptionService: HttpExceptionService
  ) {}

  async getAllCategories(): Promise<Category[]> {
    try {
      return await this.categoryRepo.find({ withDeleted: false });
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async getCategoriesWithPage(
    paginationDto: PaginationDto
  ): Promise<CategoriesWithPageResponse> {
    const { page, limit } = paginationDto;
    const skippedItems = (page - 1) * limit;

    try {
      const data = await this.categoryRepo.find({
        skip: skippedItems,
        take: limit,
        withDeleted: false,
      });

      return {
        nextPage: page + 1,
        data,
      };
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async sortCategoriesWithName(option: FindOptionsOrderValue) {
    try {
      return await this.categoryRepo.find({
        order: {
          name: option,
        },
        withDeleted: false,
      });
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async getCategoryById(id: string): Promise<Category> {
    try {
      const category = await this.categoryRepo.findOne({ where: { id } });

      if (!category) {
        throw this.httpExceptionService.notFoundRequests(
          `Category ${id} not found`
        );
      }

      return category;
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto
  ): Promise<Category> {
    try {
      const cate = new Category();
      cate.name = createCategoryDto.name;
      cate.parentId = createCategoryDto.parentId;

      const newCate = this.categoryRepo.create(cate);
      return await this.categoryRepo.save(newCate);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    try {
      const category = await this.getCategoryById(id);

      const updatedItem = Object.assign(category, updateCategoryDto);
      return await this.categoryRepo.save(updatedItem);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async deleteCategory(id: string): Promise<void> {
    try {
      const category = await this.getCategoryById(id);

      await this.categoryRepo.remove(category);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async getProductByCategoryId(categoryId: string): Promise<Product[]> {
    try {
      const category = await this.getCategoryById(categoryId);

      return await category.products;
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }
}
