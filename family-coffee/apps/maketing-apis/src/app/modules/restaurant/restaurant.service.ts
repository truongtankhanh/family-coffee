import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from '@family-coffee/entities';
import { FindOptionsOrderValue, Repository } from 'typeorm';
import { HttpExceptionService } from '@family-coffee/services';
import { PaginationDto } from './dto/pagination.dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

export interface RestaurantWithPageResponse {
  nextPage: number;
  data: Restaurant[];
}

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
    private readonly httpExceptionService: HttpExceptionService
  ) {}

  async getAllRestaurant(): Promise<Restaurant[]> {
    try {
      return await this.restaurantRepo.find({ withDeleted: false });
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async getRestaurantWithPage(
    paginationDto: PaginationDto
  ): Promise<RestaurantWithPageResponse> {
    const { page, limit } = paginationDto;
    const skippedItems = (page - 1) * limit;

    try {
      const data = await this.restaurantRepo.find({
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

  async sortRestaurantWithDate(option: FindOptionsOrderValue) {
    try {
      return await this.restaurantRepo.find({
        order: {
          createdAt: option,
        },
        withDeleted: false,
      });
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async getRestaurantById(id: string): Promise<Restaurant> {
    try {
      const restaurant = await this.restaurantRepo.findOne({ where: { id } });

      if (!restaurant) {
        throw this.httpExceptionService.notFoundRequests(
          `Restaurant ${id} not found`
        );
      }

      return restaurant;
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async createRestaurant(
    createRestaurantDto: CreateRestaurantDto
  ): Promise<Restaurant> {
    try {
      const restaurant = new Restaurant();
      restaurant.description = createRestaurantDto.description;
      restaurant.address = createRestaurantDto.address;
      restaurant.phoneNumber = createRestaurantDto.phone_number;
      restaurant.email = createRestaurantDto.email;
      restaurant.workingHours = createRestaurantDto.working_hours;

      const newRestaurant = this.restaurantRepo.create(restaurant);
      return await this.restaurantRepo.save(newRestaurant);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async updateRestaurant(
    id: string,
    updateRestaurantDto: UpdateRestaurantDto
  ): Promise<Restaurant> {
    try {
      const restaurant = await this.getRestaurantById(id);

      const updatedItem = Object.assign(restaurant, updateRestaurantDto);
      return await this.restaurantRepo.save(updatedItem);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async deleteRestaurant(id: string): Promise<void> {
    try {
      const restaurant = await this.getRestaurantById(id);

      await this.restaurantRepo.remove(restaurant);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }
}
