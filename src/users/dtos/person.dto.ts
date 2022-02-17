import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

import { DocumentType } from 'src/common/document-type';

export class CreatePersonDto {
  @IsString()
  @ApiProperty({ description: 'the name of person' })
  readonly name: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

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

export class UpdatePersonDto extends PartialType(CreatePersonDto) {}
