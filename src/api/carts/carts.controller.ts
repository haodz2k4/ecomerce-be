import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CartsService } from './carts.service';
import { AddCartDto } from './dto/add-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { User } from 'src/decorator/user.decorator';
import { CartItemResDto } from './dto/cart-item-res.dto';
import { QueryCartDto } from './dto/query-cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  add(@User('id') userId: string,@Body() addCartDto: AddCartDto) :Promise<CartItemResDto> {
    return this.cartsService.add(userId,addCartDto);
  }

  @Get()
  get(@User('id') userId: string,@Query() queryCartDto: QueryCartDto) {
    return this.cartsService.get(userId, queryCartDto);
  }


  @Patch()
  update(
    @User('id') userId: string, 
    @Body() updateCartDto: UpdateCartDto
  ) :Promise<CartItemResDto> {
    return this.cartsService.update(userId, updateCartDto);
  }

  @Delete()
  remove(@User('id') userId: string, @Body('productId') productId: string) {
    return this.cartsService.remove(userId, productId);
  }

  @Delete('clear')
  clear(@User('id') userId: string) :Promise<void> {
    return this.cartsService.clear(userId)
  }
}
