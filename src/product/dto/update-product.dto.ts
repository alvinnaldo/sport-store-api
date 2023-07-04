import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly product_name?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly category?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly price?: number;
}
