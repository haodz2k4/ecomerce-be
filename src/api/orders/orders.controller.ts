import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ResponseMessage } from 'src/decorator/response-message.decorator';
import { QueryOrderDto } from './dto/query-order.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';
import { OrderResDto } from './dto/order-res.dto';
import { User } from 'src/decorator/user.decorator';
import { StatsOrderDto } from './dto/stats-order.dto';
import { StatsOrderResDto } from './dto/stats-order-res.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('stats')
  stats(@Query() statsOrderDto: StatsOrderDto) :Promise<StatsOrderResDto> {
    return this.ordersService.stats(statsOrderDto)
  }

  @Post()
  @ResponseMessage('Create order successfully')
  create(@User('id') userId: string,@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(userId,createOrderDto);
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
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
