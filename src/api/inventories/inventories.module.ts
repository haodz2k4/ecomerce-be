import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';
import { InventoriesRepository } from './inventories.repository';

@Module({
  controllers: [InventoriesController],
  providers: [InventoriesService, InventoriesRepository],
})
export class InventoriesModule {}
