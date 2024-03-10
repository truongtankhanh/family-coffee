import {ApiProperty} from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  readonly name: string = '';

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly parentId?: number;
}
