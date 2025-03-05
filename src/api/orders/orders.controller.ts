import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ResponseMessage } from 'src/decorator/response-message.decorator';
import { QueryOrderDto } from './dto/query-order.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';
import { OrderResDto } from './dto/order-res.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ResponseMessage('Create order successfully')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(@Query() queryOrderDto: QueryOrderDto) :Promise<PaginatedResDto<OrderResDto>> {
    return this.ordersService.findAll(queryOrderDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
