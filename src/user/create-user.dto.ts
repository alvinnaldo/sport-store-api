import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';
import { RoleEnum } from './user.schema';

export class CreateUserDto {
  @ApiProperty()
  @IsAlphanumeric()
  @IsNotEmpty()
  readonly user_name!: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email!: string;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 2,
    minSymbols: 0,
  })
  @IsNotEmpty()
  readonly password!: string;

  @ApiProperty({ enum: RoleEnum, default: 'user / admin' })
  @IsEnum(RoleEnum)
  @IsNotEmpty()
  readonly role!: RoleEnum;
}
