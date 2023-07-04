import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddToCartDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly product_name!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly price!: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly quantity!: number;
}
