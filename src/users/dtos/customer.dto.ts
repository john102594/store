import { IsOptional, IsNotEmpty, IsPositive, IsNumber } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly max_credit: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly personId: number;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
