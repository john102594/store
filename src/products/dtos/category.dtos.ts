import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly productsIds: number[];
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
