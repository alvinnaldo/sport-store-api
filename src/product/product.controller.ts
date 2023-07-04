import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Res,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './schemas/product.schema';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @ApiOkResponse({
    description: 'The product records',
  })
  @Get()
  async findAllProducts(@Res() response): Promise<Product[]> {
    if (!(await this.productService.findAll()).length) {
      throw new HttpException('Product empty', HttpStatus.NOT_FOUND);
    }
    const products = await this.productService.findAll();
    return response.status(HttpStatus.OK).send({
      message: 'Find all products success',
      products,
    });
  }

  @Get(':id')
  async findOneProduct(@Param('id') id: string): Promise<Product> {
    try {
      return await this.productService.findOne(id);
    } catch (error) {
      throw new HttpException(
        `Product by id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async remove(@Param('id') id: string): Promise<string> {
    return this.productService.remove(id);
  }
}
