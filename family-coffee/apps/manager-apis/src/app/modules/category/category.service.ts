import { FindOptionsOrderValue } from 'typeorm';
import { Category } from '@family-coffee/entities';
import { AppDataSource } from '@family-coffee/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginationDto } from './dto/pagination.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

export interface CategoriesWithPageResponse {
  nextPage: number;
  data: Category[];
}

@Injectable()
export class CategoryService {
  private readonly categoryRepo = AppDataSource.getRepository(Category);

  async getAllCategories(): Promise<Category[]> {
    try {
      return await this.categoryRepo.find({ withDeleted: false });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
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
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
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
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async getCategoryById(id: number): Promise<Category> {
    try {
      return await this.categoryRepo.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto
  ): Promise<Category> {
    try {
      return await AppDataSource.transaction(async (t) => {
        const repository = t.getRepository(Category);
        const newCate = repository.create(createCategoryDto);
        return await repository.save(newCate);
      });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    try {
      return await AppDataSource.transaction(async (t) => {
        const repository = t.getRepository(Category);

        const category = await this.getCategoryById(id);
        if (!category) {
          throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }

        const updatedItem = Object.assign(category, updateCategoryDto);
        return await repository.save(updatedItem);
      });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async deleteCategory(id: number): Promise<void> {
    try {
      await AppDataSource.transaction(async (t) => {
        const repository = t.getRepository(Category);

        const category = await this.getCategoryById(id);
        if (!category) {
          throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }

        await repository.remove(category);
      });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }
}
