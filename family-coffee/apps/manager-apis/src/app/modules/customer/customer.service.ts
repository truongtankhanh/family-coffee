import { Customer } from '@family-coffee/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrderValue, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    private readonly customerRepo: Repository<Customer>
  ) {}

  async getAllCustomers(): Promise<Customer[]> {
    try {
      return await this.customerRepo.find({ withDeleted: false });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
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
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
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
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async getCustomerById(id: string): Promise<Customer> {
    try {
      return await this.customerRepo.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
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
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async updateCustomer(
    id: string,
    updateCustomerDto: UpdateCustomerDto
  ): Promise<Customer> {
    try {
      const customer = await this.getCustomerById(id);
      if (!customer) {
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
      }

      const updatedItem = Object.assign(customer, updateCustomerDto);
      return await this.customerRepo.save(updatedItem);
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }

  async deleteCustomer(id: string): Promise<void> {
    try {
      const customer = await this.getCustomerById(id);
      if (!customer) {
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
      }

      await this.customerRepo.remove(customer);
    } catch (error) {
      throw new HttpException(
        (error as Error).message,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }
}
