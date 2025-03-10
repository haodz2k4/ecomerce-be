import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { FavoriteListService } from './favorite-list.service';
import { CreateFavoriteListDto } from './dto/create-favorite-list.dto';
import { UpdateFavoriteListDto } from './dto/update-favorite-list.dto';
import { FavoriteListResDto } from './dto/favorite-list-res.dto';
import { User } from 'src/decorator/user.decorator';
import { QueryFavoriteListDto } from './dto/query-favorite-list.dto';

@Controller('favorite-list')
export class FavoriteListController {
  constructor(private readonly favoriteListService: FavoriteListService) {}

  @Post()
  create(@User('id') userId: string,@Body() createFavoriteListDto: CreateFavoriteListDto) :Promise<FavoriteListResDto> {
    return this.favoriteListService.create(userId,createFavoriteListDto);
  }

  @Get()
  findAll(@Query() queryFavoriteListDto: QueryFavoriteListDto) {
    return this.favoriteListService.findAll(queryFavoriteListDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string)  :Promise<FavoriteListResDto>  {
    return this.favoriteListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavoriteListDto: UpdateFavoriteListDto) :Promise<FavoriteListResDto> {
    return this.favoriteListService.update(+id, updateFavoriteListDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) :Promise<void> {
    return this.favoriteListService.remove(+id);
  }
}
