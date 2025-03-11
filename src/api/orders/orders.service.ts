import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';
import { QueryOrderDto } from './dto/query-order.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';
import { OrderResDto } from './dto/order-res.dto';
import { StatsOrderDto } from './dto/stats-order.dto';
import { StatsOrderResDto } from './dto/stats-order-res.dto';

@Injectable()
export class OrdersService {

  constructor(private ordersRepository: OrdersRepository) {}

  stats(statOrder: StatsOrderDto) :Promise<StatsOrderResDto> {
    return this.ordersRepository.stats(statOrder)
  }
  create(userId: string, createOrderDto: CreateOrderDto) {
    return this.ordersRepository.create(userId, createOrderDto)
  }

  findAll(queryOrderDto: QueryOrderDto):Promise<PaginatedResDto<OrderResDto>> {
    return this.ordersRepository.getMany(queryOrderDto)
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
