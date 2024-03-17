import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  readonly customer_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty()
  @IsString()
  @MaxLength(36)
  @IsNotEmpty()
  readonly restaurant_id: string;
}
