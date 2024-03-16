import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateBlogDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  readonly author: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly publishe_at: string;
}
