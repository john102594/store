import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly job: string;

  @IsOptional()
  @ApiProperty()
  readonly salary: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly personId: number;
}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
