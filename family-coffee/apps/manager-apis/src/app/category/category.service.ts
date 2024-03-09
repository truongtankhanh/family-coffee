import {Category} from '@family-coffee/entities';
import { AppDataSource } from '@family-coffee/config';
import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  private readonly categoryRepo = AppDataSource.getRepository(Category);

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepo.find();
  }

  async getCategoryById(id: number): Promise<Category> {
    return await this.categoryRepo.findOneOrFail({where: {id}});
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCate = this.categoryRepo.create(createCategoryDto);
    return await this.categoryRepo.save(newCate);
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
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
