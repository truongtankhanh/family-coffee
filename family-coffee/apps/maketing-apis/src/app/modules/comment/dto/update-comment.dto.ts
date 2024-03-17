import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  readonly commenter_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly comment_content: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly commented_at: string;

  @ApiProperty()
  @IsString()
  @MaxLength(36)
  @IsNotEmpty()
  readonly blog_id: string;
}
