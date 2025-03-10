import { Module } from '@nestjs/common';
import { FavoriteListService } from './favorite-list.service';
import { FavoriteListController } from './favorite-list.controller';
import { FavoriteListRepository } from './favorite-list.repository';

@Module({
  controllers: [FavoriteListController],
  providers: [FavoriteListService, FavoriteListRepository],
})
export class FavoriteListModule {}
