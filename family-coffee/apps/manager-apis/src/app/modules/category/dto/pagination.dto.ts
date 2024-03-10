import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PaginationDto {
  @ApiProperty()
  @IsNumber()
  readonly page: number;

  @ApiProperty()
  @IsNumber()
  readonly limit: number;
}
