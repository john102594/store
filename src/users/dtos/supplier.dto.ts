import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateSupplierDto {
  @IsOptional()
  @ApiProperty()
  readonly companyId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly personId: number;
}

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {}
