import { Injectable } from '@nestjs/common';
import { Feedback } from '@family-coffee/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrderValue, Repository } from 'typeorm';
import { HttpExceptionService } from '@family-coffee/services';
import { PaginationDto } from './dto/pagination.dto';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

export interface FeedbackWithPageResponse {
  nextPage: number;
  data: Feedback[];
}

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepo: Repository<Feedback>,
    private readonly httpExceptionService: HttpExceptionService
  ) {}

  async getAllFeedback(): Promise<Feedback[]> {
    try {
      return await this.feedbackRepo.find({ withDeleted: false });
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async getFeedbackWithPage(
    paginationDto: PaginationDto
  ): Promise<FeedbackWithPageResponse> {
    const { page, limit } = paginationDto;
    const skippedItems = (page - 1) * limit;

    try {
      const data = await this.feedbackRepo.find({
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

  async sortFeedbackWithDate(option: FindOptionsOrderValue) {
    try {
      return await this.feedbackRepo.find({
        order: {
          createdAt: option,
        },
        withDeleted: false,
      });
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async getFeedbackById(id: string): Promise<Feedback> {
    try {
      const feedback = await this.feedbackRepo.findOne({ where: { id } });

      if (!feedback) {
        throw this.httpExceptionService.notFoundRequests(
          `Feedback ${id} not found`
        );
      }

      return feedback;
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async createFeedback(
    createFeedbackDto: CreateFeedbackDto
  ): Promise<Feedback> {
    try {
      const feedback = new Feedback();
      feedback.customerName = createFeedbackDto.customer_name;
      feedback.message = createFeedbackDto.message;
      feedback.restaurantId = createFeedbackDto.restaurant_id;

      const newFeedback = this.feedbackRepo.create(feedback);
      return await this.feedbackRepo.save(newFeedback);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async updateFeedback(
    id: string,
    updateFeedbackDto: UpdateFeedbackDto
  ): Promise<Feedback> {
    try {
      const feedback = await this.getFeedbackById(id);

      const updatedItem = Object.assign(feedback, updateFeedbackDto);
      return await this.feedbackRepo.save(updatedItem);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }

  async deleteFeedback(id: string): Promise<void> {
    try {
      const feedback = await this.getFeedbackById(id);

      await this.feedbackRepo.remove(feedback);
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests((error as Error).message);
    }
  }
}
