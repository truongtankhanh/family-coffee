import { FindOptionsOrderValue } from 'typeorm';
import { Order } from '@family-coffee/entities';
import { AppDataSource } from '@family-coffee/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginationDto } from './dto/pagination.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

export interface OrdersWithPageResponse {
  nextPage: number;
  data: Order[];
}

@Injectable()
export class OrderService {
  private readonly orderRepo = AppDataSource.getRepository(Order);

  async getAllOrders(): Promise<Order[]> {
    try {
      return await this.orderRepo.find({ withDeleted: false });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async getOrdersWithPage(
    paginationDto: PaginationDto
  ): Promise<OrdersWithPageResponse> {
    const { page, limit } = paginationDto;
    const skippedItems = (page - 1) * limit;

    try {
      const data = await this.orderRepo.find({
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

  async sortOrdersWithDate(option: FindOptionsOrderValue) {
    try {
      return await this.orderRepo.find({
        order: {
          orderDate: option,
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

  async getOrderById(id: string): Promise<Order> {
    try {
      return await this.orderRepo.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      return await AppDataSource.transaction(async (t) => {
        const repository = t.getRepository(Order);

        const order = new Order();
        order.orderDate = new Date(createOrderDto.orderDate);
        order.status = createOrderDto.status;
        order.paymentStatus = createOrderDto.paymentStatus;
        order.totalAmount = createOrderDto.totalAmount;

        const newOrder = repository.create(order);
        return await repository.save(newOrder);
      });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async updateOrder(
    id: string,
    updateOrderDto: UpdateOrderDto
  ): Promise<Order> {
    try {
      return await AppDataSource.transaction(async (t) => {
        const repository = t.getRepository(Order);

        const order = await this.getOrderById(id);
        if (!order) {
          throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }

        const updatedItem = Object.assign(order, updateOrderDto);
        return await repository.save(updatedItem);
      });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async deleteOrder(id: string): Promise<void> {
    try {
      await AppDataSource.transaction(async (t) => {
        const repository = t.getRepository(Order);

        const order = await this.getOrderById(id);
        if (!order) {
          throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }

        await repository.remove(order);
      });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }
}
