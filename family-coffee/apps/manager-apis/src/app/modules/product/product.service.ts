import { Product } from '@family-coffee/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrderValue, Repository } from 'typeorm';
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
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>
  ) {}

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
      const product = new Product();
      product.name = createProductDto.name;
      product.description = createProductDto.description;
      product.price = createProductDto.price;

      const newProduct = this.productRepo.create(product);
      return await this.productRepo.save(newProduct);
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
      const product = await this.getProductById(id);
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      const updatedItem = Object.assign(product, updateProductDto);
      return await this.productRepo.save(updatedItem);
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      const product = await this.getProductById(id);
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      await this.productRepo.remove(product);
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }
}
