import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsReposiory } from './products.repository';
import { ProductResDto } from './dto/product-res.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {

  constructor(private productsRepository: ProductsReposiory) {}

  create(createProductDto: CreateProductDto) :Promise<ProductResDto> {
    return this.productsRepository.create(createProductDto)
  }

  findAll(queryProductDto?: QueryProductDto): Promise<PaginatedResDto<ProductResDto>> {
    return this.productsRepository.getMany(queryProductDto)
  }

  findOne(id: string) :Promise<ProductResDto>  {
    return this.productsRepository.getOneById(id)
  }

  getOneBySlug(slug: string) :Promise<ProductResDto> {
    return this.productsRepository.getOneBySlug(slug);
  }

  update(id: string, updateProductDto: UpdateProductDto) :Promise<ProductResDto>  {
    return this.productsRepository.update(id, updateProductDto)
  }

  remove(id: string) :Promise<void> {
    return this.productsRepository.remove(id)
  }
}
