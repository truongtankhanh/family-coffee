import { Payment } from '@family-coffee/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrderValue, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    private readonly paymentRepo: Repository<Payment>
  ) {}

  async getAllPayments(): Promise<Payment[]> {
    try {
      return await this.paymentRepo.find({ withDeleted: false });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
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
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
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
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async getPaymentById(id: string): Promise<Payment> {
    try {
      return await this.paymentRepo.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
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
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async updatePayment(
    id: string,
    updatePaymentDto: UpdatePaymentDto
  ): Promise<Payment> {
    try {
      const payment = await this.getPaymentById(id);
      if (!payment) {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }

      const updatedItem = Object.assign(payment, updatePaymentDto);
      return await this.paymentRepo.save(updatedItem);
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async deletePayment(id: string): Promise<void> {
    try {
      const payment = await this.getPaymentById(id);
      if (!payment) {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }

      await this.paymentRepo.remove(payment);
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }
}
