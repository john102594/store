import {
  IsString,
  IsPositive,
  IsOptional,
  Length,
  IsEmail,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the name of user' })
  readonly email: string;

  @IsString()
  @Length(6)
  @ApiProperty()
  readonly password: string;

  @IsString()
  @ApiProperty()
  readonly role: string;

  @IsOptional()
  @IsPositive()
  @ApiProperty()
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
