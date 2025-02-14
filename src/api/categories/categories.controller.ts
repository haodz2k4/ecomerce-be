import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesResDto } from './dto/categories-res.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) :Promise<CategoriesResDto> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() :Promise<PaginatedResDto<CategoriesResDto>> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) :Promise<CategoriesResDto> {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) :Promise<CategoriesResDto> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) :Promise<void> {
    return this.categoriesService.remove(id);
  }
}
