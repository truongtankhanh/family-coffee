import { FindOptionsOrderValue } from 'typeorm';
import { Category } from '@family-coffee/entities';
import { AppDataSource } from '@family-coffee/config';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from './dto/pagination.dto';

export interface CategoriesWithPageResponse {
  nextPage: number;
  data: Category[];
}

@Injectable()
export class CategoryService {
  private readonly categoryRepo = AppDataSource.getRepository(Category);

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepo.find({ withDeleted: false });
  }

  async getCategoriesWithPage(
    paginationDto: PaginationDto
  ): Promise<CategoriesWithPageResponse> {
    const { page, limit } = paginationDto;
    const skippedItems = (page - 1) * limit;

    const data = await this.categoryRepo.find({
      skip: skippedItems,
      take: limit,
      withDeleted: false,
    });

    return {
      nextPage: page + 1,
      data,
    };
  }

  async sortCategoriesWithName(option: FindOptionsOrderValue) {
    return await this.categoryRepo.find({
      order: {
        name: option,
      },
      withDeleted: false,
    });
  }

  async getCategoryById(id: number): Promise<Category> {
    return await this.categoryRepo.findOneOrFail({ where: { id } });
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto
  ): Promise<Category> {
    const newCate = this.categoryRepo.create(createCategoryDto);
    return await this.categoryRepo.save(newCate);
  }

  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    const category = await this.getCategoryById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const updatedItem = Object.assign(category, updateCategoryDto);
    return await this.categoryRepo.save(updatedItem);
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.getCategoryById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepo.remove(category);
  }
}
