import { Injectable } from '@nestjs/common';
import { Customer } from '@family-coffee/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrderValue, Repository } from 'typeorm';
import { HttpExceptionService } from '@family-coffee/services';

import { PaginationDto } from './dto/pagination.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';

export interface CustomersWithPageResponse {
  nextPage: number;
  data: Customer[];
}

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    private readonly httpExceptionService: HttpExceptionService
  ) {}

  async getAllCustomers(): Promise<Customer[]> {
    try {
      return await this.customerRepo.find({ withDeleted: false });
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async getCustomersWithPage(
    paginationDto: PaginationDto
  ): Promise<CustomersWithPageResponse> {
    const { page, limit } = paginationDto;
    const skippedItems = (page - 1) * limit;

    try {
      const data = await this.customerRepo.find({
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

  async sortCustomersWithName(option: FindOptionsOrderValue) {
    try {
      return await this.customerRepo.find({
        order: {
          name: option,
        },
        withDeleted: false,
      });
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async getCustomerById(id: string): Promise<Customer> {
    try {
      const customer = await this.customerRepo.findOne({ where: { id } });

      if (!customer) {
        throw this.httpExceptionService.notFoundRequests(
          `Customer ${id} not found`
        );
      }

      return customer;
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async createCustomer(
    createCustomerDto: CreateCustomerDto
  ): Promise<Customer> {
    try {
      const customer = new Customer();
      customer.name = createCustomerDto.name;
      customer.phoneNumber = createCustomerDto.phone_number;

      const newCustomer = this.customerRepo.create(customer);
      return await this.customerRepo.save(newCustomer);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async updateCustomer(
    id: string,
    updateCustomerDto: UpdateCustomerDto
  ): Promise<Customer> {
    try {
      const customer = await this.getCustomerById(id);

      const updatedItem = Object.assign(customer, updateCustomerDto);
      return await this.customerRepo.save(updatedItem);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async deleteCustomer(id: string): Promise<void> {
    try {
      const customer = await this.getCustomerById(id);

      await this.customerRepo.remove(customer);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }
}
