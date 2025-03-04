import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {

  constructor(private ordersRepository: OrdersRepository) {}

  create(createOrderDto: CreateOrderDto) {
    return this.ordersRepository.create(createOrderDto)
  }

  findAll() {
    return this.ordersRepository.getMany()
  }

  findOne(id: string) {
    return this.ordersRepository.getOneById(id)
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.ordersRepository.update(id, updateOrderDto)
  }

  remove(id: string) {
    return this.ordersRepository.remove(id)
  }
}
