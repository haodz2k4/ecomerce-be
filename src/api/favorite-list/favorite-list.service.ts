import { Injectable } from '@nestjs/common';
import { CreateFavoriteListDto } from './dto/create-favorite-list.dto';
import { UpdateFavoriteListDto } from './dto/update-favorite-list.dto';
import { FavoriteListRepository } from './favorite-list.repository';
import { FavoriteListResDto } from './dto/favorite-list-res.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';

@Injectable()
export class FavoriteListService {

  constructor(private favoriteListRepository: FavoriteListRepository) {}
  create(userId: string, createFavoriteListDto: CreateFavoriteListDto) :Promise<FavoriteListResDto> {
    return this.favoriteListRepository.create(userId, createFavoriteListDto);
  }

  findAll(): Promise<PaginatedResDto<FavoriteListResDto>> {
    return this.favoriteListRepository.getMany();
  }

  findOne(id: number) :Promise<FavoriteListResDto> {
    return this.favoriteListRepository.getOneById(id)
  }

  update(id: number, updateFavoriteListDto: UpdateFavoriteListDto):Promise<FavoriteListResDto> {
    return this.favoriteListRepository.update(id, updateFavoriteListDto);
  }

  remove(id: number) {
    return this.favoriteListRepository.remove(id)
  }
}
