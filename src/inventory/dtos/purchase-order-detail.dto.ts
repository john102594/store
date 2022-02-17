import { IsNumber, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreatePurchaseOrderItemDto {
  // @IsNumber()
  // @IsPositive()
  // @ApiProperty()
  // readonly orderId: number;

  @IsNumber()
  @ApiProperty()
  readonly quantity: number;

  @IsNumber()
  @ApiProperty()
  readonly unit_cost: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  readonly productId: number;
}

export class UpdatePurchaseOrderItemDto extends PartialType(
  CreatePurchaseOrderItemDto,
) {}
