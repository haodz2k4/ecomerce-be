import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsReposiory } from './products.repository';
import { ProductResDto } from './dto/product-res.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UploadProduct } from './interface/upload-product';
import { plainToInstance } from 'class-transformer';
import { UploadProductResDto } from './dto/upload-product-res.dto';

@Injectable()
export class ProductsService {

  constructor(
    private productsRepository: ProductsReposiory,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  create(createProductDto: CreateProductDto) :Promise<ProductResDto> {
    return this.productsRepository.create(createProductDto)
  }

  findAll(queryProductDto?: QueryProductDto): Promise<PaginatedResDto<ProductResDto>> {
    return this.productsRepository.getMany(queryProductDto)
  }

  findOne(id: string) :Promise<ProductResDto>  {
    return this.productsRepository.getOneById(id)
  }

  async upload(uploadProductDto: UploadProduct): Promise<UploadProductResDto> {
    const [thumbnails, images] = await Promise.all([
      this.cloudinaryService.uploadMulti(uploadProductDto.thumbnail),
      this.cloudinaryService.uploadMulti(uploadProductDto.images)
    ])
    return plainToInstance(UploadProductResDto, {
      thumbnail: thumbnails[0],
      images
    })
  }

  getOneBySlug(slug: string) :Promise<ProductResDto> {
    return this.productsRepository.getOneBySlug(slug);
  }

  update(id: string, updateProductDto: UpdateProductDto) :Promise<ProductResDto>  {
    return this.productsRepository.update(id, updateProductDto)
  }

  async removeMultiImage(productId: string, ids: number[]) :Promise<void>  {
    await this.productsRepository.removeMultiImage(productId,ids )
  }

  remove(id: string) :Promise<void> {
    return this.productsRepository.remove(id)
  }
}
