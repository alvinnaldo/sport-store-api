import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './cart.schema';
import { Model } from 'mongoose';
import { AddToCartDto } from './add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
  ) {}

  async addToCart(addToCartDto: AddToCartDto, user_id: string): Promise<Cart> {
    const productToAdd = await new this.cartModel({ ...addToCartDto, user_id });
    productToAdd.save();
    return productToAdd;
  }

  async getCartByUserId(user_id: string): Promise<Cart[]> {
    const cartList = await this.cartModel.find({ user_id: user_id });
    return cartList;
  }
}
