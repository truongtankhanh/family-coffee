import { Injectable } from '@nestjs/common';
import { Payment } from '@family-coffee/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrderValue, Repository } from 'typeorm';
import { HttpExceptionService } from '@family-coffee/services';

import { PaginationDto } from './dto/pagination.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

export interface PaymentsWithPageResponse {
  nextPage: number;
  data: Payment[];
}

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    private readonly httpExceptionService: HttpExceptionService
  ) {}

  async getAllPayments(): Promise<Payment[]> {
    try {
      return await this.paymentRepo.find({ withDeleted: false });
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async getPaymentsWithPage(
    paginationDto: PaginationDto
  ): Promise<PaymentsWithPageResponse> {
    const { page, limit } = paginationDto;
    const skippedItems = (page - 1) * limit;

    try {
      const data = await this.paymentRepo.find({
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

  async sortPaymentsWithDate(option: FindOptionsOrderValue) {
    try {
      return await this.paymentRepo.find({
        order: {
          paymentDate: option,
        },
        withDeleted: false,
      });
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async getPaymentById(id: string): Promise<Payment> {
    try {
      const payment = await this.paymentRepo.findOne({ where: { id } });

      if (!payment) {
        throw this.httpExceptionService.notFoundRequests(
          `Payment ${id} not found`
        );
      }

      return payment;
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    try {
      const payment = new Payment();
      payment.orderId = createPaymentDto.order_id;
      payment.paymentMethod = createPaymentDto.payment_method;
      payment.amount = createPaymentDto.amount;
      payment.paymentDate = createPaymentDto.payment_date;
      payment.status = createPaymentDto.status;

      const newPayment = this.paymentRepo.create(payment);
      return await this.paymentRepo.save(newPayment);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async updatePayment(
    id: string,
    updatePaymentDto: UpdatePaymentDto
  ): Promise<Payment> {
    try {
      const payment = await this.getPaymentById(id);

      const updatedItem = Object.assign(payment, updatePaymentDto);
      return await this.paymentRepo.save(updatedItem);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async deletePayment(id: string): Promise<void> {
    try {
      const payment = await this.getPaymentById(id);

      await this.paymentRepo.remove(payment);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }
}
