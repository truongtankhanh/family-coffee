import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { TypeOrderStatus, TypePaymentStatus } from '@family-coffee/enums';

export class CreatePaymentDto {
  @ApiProperty()
  @IsString()
  @MaxLength(36)
  @IsNotEmpty()
  readonly order_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly payment_method: TypeOrderStatus;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly amount: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly payment_date: Date;


  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: TypePaymentStatus
}
