import { Injectable } from '@nestjs/common';
import { AddCartDto, } from './dto/add-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartsRepository } from './carts.repositoy';
import { CartItemResDto } from './dto/cart-item-res.dto';
import { QueryCartDto } from './dto/query-cart.dto';

@Injectable()
export class CartsService {

  constructor(private cartsRepository: CartsRepository) {}
  add(userId: string, addCartDto: AddCartDto) :Promise<CartItemResDto> {
    return this.cartsRepository.add(userId, addCartDto);
  }

  get(userId: string,queryCartDto: QueryCartDto) {
    return this.cartsRepository.get(userId, queryCartDto);
  }

  update(userId: string, updateCartDto: UpdateCartDto) :Promise<CartItemResDto> {
    return this.cartsRepository.update(userId, updateCartDto)
  }

  remove(userId: string, productId: string) {
    return this.cartsRepository.remove(userId, productId)
  }

  clear(userId: string) :Promise<void> {
    return this.cartsRepository.clear(userId)
  }
}
