import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { ProductsModule } from '../products/products.module';
import { CartsModule } from '../carts/carts.module';
import { OrdersGateway } from './orders.gateway';

@Module({
  imports: [ProductsModule, CartsModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, OrdersGateway],
  exports: [OrdersService]
})
export class OrdersModule {}
