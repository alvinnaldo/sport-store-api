import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly product_name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly category!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly price!: number;
}
