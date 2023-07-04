import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './add-to-cart.dto';
import { Cart } from './cart.schema';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('cart')
@ApiTags('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add-to-cart')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles('user')
  async addToCart(
    @Body() addToCartDto: AddToCartDto,
    @Request() req,
  ): Promise<Cart> {
    return this.cartService.addToCart(addToCartDto, req.decrypt.user_id);
  }

  @Get('get-user-cart')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles('user')
  async getCartListByUserId(@Request() req): Promise<Cart[]> {
    return this.cartService.getCartByUserId(req.decrypt.user_id);
  }
}
