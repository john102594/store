import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  IsArray,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly sku: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly image: string;
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
