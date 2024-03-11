import { FindOptionsOrderValue } from 'typeorm';
import { Product } from '@family-coffee/entities';
import { AppDataSource } from '@family-coffee/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginationDto } from './dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

export interface ProductsWithPageResponse {
  nextPage: number;
  data: Product[];
}

@Injectable()
export class ProductService {
  private readonly productRepo = AppDataSource.getRepository(Product);

  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.productRepo.find({ withDeleted: false });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async getProductsWithPage(
    paginationDto: PaginationDto
  ): Promise<ProductsWithPageResponse> {
    const { page, limit } = paginationDto;
    const skippedItems = (page - 1) * limit;

    try {
      const data = await this.productRepo.find({
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

  async sortProductsWithName(option: FindOptionsOrderValue) {
    try {
      return await this.productRepo.find({
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

  async getProductById(id: string): Promise<Product> {
    try {
      return await this.productRepo.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await AppDataSource.transaction(async (t) => {
        const repository = t.getRepository(Product);

        const product = new Product();
        product.name = createProductDto.name;
        product.description = createProductDto.description;
        product.price = createProductDto.price;

        const newProduct = repository.create(product);
        return await repository.save(newProduct);
      });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    try {
      return await AppDataSource.transaction(async (t) => {
        const repository = t.getRepository(Product);

        const product = await this.getProductById(id);
        if (!product) {
          throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }

        const updatedItem = Object.assign(product, updateProductDto);
        return await repository.save(updatedItem);
      });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      await AppDataSource.transaction(async (t) => {
        const repository = t.getRepository(Product);

        const product = await this.getProductById(id);
        if (!product) {
          throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }

        await repository.remove(product);
      });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }
}
