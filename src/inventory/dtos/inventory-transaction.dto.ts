import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateInventoryTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly productId: number;

  @IsNumber()
  @ApiProperty()
  readonly quantity: number;

  @IsNumber()
  @ApiProperty()
  readonly unit_price: number;

  @IsNumber()
  @ApiProperty()
  readonly balance: number;

  @IsNumber()
  @ApiProperty()
  readonly unit_cost_avg: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  readonly purchaseOrderId: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  readonly OrderId: number;
}

export class UpdateInventoryTransactionDto extends PartialType(
  CreateInventoryTransactionDto,
) {}
