import { QueryCategoryDto } from './dto/query-category.dto';
import { CategoriesRepository } from './categories.repository';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesResDto } from './dto/categories-res.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';

@Injectable()
export class CategoriesService {

  constructor(private categoriesRepository: CategoriesRepository) {}

  create(createCategoryDto: CreateCategoryDto): Promise<CategoriesResDto> {
    return this.categoriesRepository.create(createCategoryDto)
  }

  findAll(queryCategoryDto?: QueryCategoryDto) :Promise<PaginatedResDto<CategoriesResDto>> {
    return this.categoriesRepository.getMany(queryCategoryDto)
  }

  findOne(id: string) :Promise<CategoriesResDto> {
    return this.categoriesRepository.getOneById(id)
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesRepository.update(id, updateCategoryDto)
  }

  remove(id: string) {
    return this.categoriesRepository.remove(id)
  }
}
