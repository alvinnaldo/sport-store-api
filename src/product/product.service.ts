import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = await new this.productModel(createProductDto);
    newProduct.save();
    return newProduct;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findOne({ _id: id });
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.productModel.findByIdAndUpdate(id, updateProductDto);
    const modifiedProduct = await this.productModel.findOne({ _id: id });
    return modifiedProduct;
  }

  async remove(id: string): Promise<string> {
    await this.productModel.findByIdAndDelete(id);
    return `Product with id ${id} is deleted`;
  }
}
