import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  readonly stock: number;

  @IsString()
  @ApiProperty()
  readonly image: string;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly brandId: number;

  @IsArray()
  @ApiProperty()
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;
}
