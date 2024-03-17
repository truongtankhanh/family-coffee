import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\+?\d+$/)
  @MaxLength(20)
  @IsNotEmpty()
  readonly phone_number: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(100)
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(35)
  @IsNotEmpty()
  readonly working_hours: string;
}
