import { Injectable } from '@nestjs/common';
import { Order } from '@family-coffee/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrderValue, Repository } from 'typeorm';
import { HttpExceptionService } from '@family-coffee/services';
import { PaginationDto } from './dto/pagination.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

export interface OrdersWithPageResponse {
  nextPage: number;
  data: Order[];
}

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly httpExceptionService: HttpExceptionService
  ) {}

  async getAllOrders(): Promise<Order[]> {
    try {
      return await this.orderRepo.find({ withDeleted: false });
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
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
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
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
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async getOrderById(id: string): Promise<Order> {
    try {
      const order = await this.orderRepo.findOne({ where: { id } });

      if (!order) {
        throw this.httpExceptionService.notFoundRequests(
          `Order ${id} not found`
        );
      }

      return order;
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const order = new Order();
      order.orderDate = new Date(createOrderDto.orderDate);
      order.status = createOrderDto.status;
      order.paymentStatus = createOrderDto.paymentStatus;
      order.totalAmount = createOrderDto.totalAmount;

      const newOrder = this.orderRepo.create(order);
      return await this.orderRepo.save(newOrder);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async updateOrder(
    id: string,
    updateOrderDto: UpdateOrderDto
  ): Promise<Order> {
    try {
      const order = await this.getOrderById(id);

      const updatedItem = Object.assign(order, updateOrderDto);
      return await this.orderRepo.save(updatedItem);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async deleteOrder(id: string): Promise<void> {
    try {
      const order = await this.getOrderById(id);

      await this.orderRepo.remove(order);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }
}
