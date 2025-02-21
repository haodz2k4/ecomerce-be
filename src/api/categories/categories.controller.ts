import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesResDto } from './dto/categories-res.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';
import { Public } from 'src/decorator/public.decorator';
import { QueryCategoryDto } from './dto/query-category.dto';


@Controller('categories')
@Public()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) :Promise<CategoriesResDto> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Public()
  findAll(@Query() queryCategoryDto: QueryCategoryDto) :Promise<PaginatedResDto<CategoriesResDto>> {
    return this.categoriesService.findAll(queryCategoryDto);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) :Promise<CategoriesResDto> {
    return this.categoriesService.findOne(id);
  }

  @Get('slug/:slug') 
  @Public()
  getProductBySlug(@Param('slug') slug: string) {
    return this.categoriesService.getOneBySlug(slug)
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
