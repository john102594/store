import { IsString, IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

import { DocumentType } from 'src/common/document-type';

export class CreateCompanyDto {
  @IsString()
  @ApiProperty({ description: 'the name of company' })
  readonly name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly website: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly document_number: string;

  @IsEnum(DocumentType)
  @ApiProperty()
  readonly document_type: string;
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
