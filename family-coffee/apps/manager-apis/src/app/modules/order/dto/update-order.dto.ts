import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TypeOrderStatus, TypePaymentStatus } from '@family-coffee/enums';

export class UpdateOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly orderDate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly status: TypeOrderStatus;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly paymentStatus: TypePaymentStatus;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly totalAmount: number;
}
