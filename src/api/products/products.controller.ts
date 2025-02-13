import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, UploadedFiles, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResDto } from './dto/product-res.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';
import { Public } from 'src/decorator/public.decorator';
import { QueryProductDto } from './dto/query-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadProduct } from './interface/upload-product';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) {}

  @Delete(':id/remove-images')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeMultiImage(@Param('id') id: string, @Body('ids') ids: number[]) {
    return this.productsService.removeMultiImage(id, ids)
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) :Promise<ProductResDto> {
    return this.productsService.create(createProductDto);
  }

  @Post(':id/upload') 
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'thumbnail', maxCount: 1},
    {name: 'images', maxCount: 5}
  ]))
  async uploadImage(@UploadedFiles() uploadProductDto: UploadProduct, @Param('id') id: string) {
    await this.productsService.upload(id, uploadProductDto)
    
  }

  @Get()
  @Public()
  findAll(@Query() queryProductDto: QueryProductDto) :Promise<PaginatedResDto<ProductResDto>> {
    return this.productsService.findAll(queryProductDto);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) :Promise<ProductResDto>  {
    return this.productsService.findOne(id);
  }

  @Get('slug/:slug')
  @Public()
  getOneBySlug(@Param('slug') slug: string) :Promise<ProductResDto> {
    return this.productsService.getOneBySlug(slug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) :Promise<ProductResDto> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) :Promise<void> {
    return this.productsService.remove(id);
  }
}
