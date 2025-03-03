import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';
import { AddCartDto } from './dto/add-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { User } from 'src/decorator/user.decorator';
import { CartItemResDto } from './dto/cart-item-res.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  add(@User('id') userId: string,@Body() addCartDto: AddCartDto) :Promise<CartItemResDto> {
    return this.cartsService.add(userId,addCartDto);
  }

  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }
}
