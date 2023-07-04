import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsAlphanumeric()
  readonly user_name?: string;

  @ApiProperty()
  @IsEmail()
  readonly email?: string;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 2,
    minSymbols: 0,
  })
  @IsOptional()
  readonly password?: string;
}
