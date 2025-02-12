import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsReposiory } from './products.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsReposiory],
})
export class ProductsModule {}
