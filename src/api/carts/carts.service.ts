import { Injectable } from '@nestjs/common';
import { AddCartDto, } from './dto/add-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartsRepository } from './carts.repositoy';
import { CartItemResDto } from './dto/cart-item-res.dto';

@Injectable()
export class CartsService {

  constructor(private cartsRepository: CartsRepository) {}
  add(userId: string, addCartDto: AddCartDto) :Promise<CartItemResDto> {
    return this.cartsRepository.add(userId, addCartDto);
  }

  findAll() {
    return `This action returns all carts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
