import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResDto } from './dto/product-res.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';
import { Public } from 'src/decorator/public.decorator';
import { QueryProductDto } from './dto/query-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadProduct } from './interface/upload-product';
import { ResponseMessage } from 'src/decorator/response-message.decorator';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) {}

  @ResponseMessage('Remove multi images')
  @Delete(':id/remove-images')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeMultiImage(@Param('id') id: string, @Body('ids') ids: number[]) {
    return this.productsService.removeMultiImage(id, ids)
  }

  @Post()
  @Public()
  @ResponseMessage('Create product')
  create(@Body() createProductDto: CreateProductDto) :Promise<ProductResDto> {
    return this.productsService.create(createProductDto);
  }

  @Post(':id/upload') 
  @ResponseMessage('Upload thumbnail and multi images')
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'thumbnail', maxCount: 1},
    {name: 'images', maxCount: 5}
  ]))
  async uploadImage(@UploadedFiles() uploadProductDto: UploadProduct, @Param('id') id: string) :Promise<void> {
    await this.productsService.upload(id, uploadProductDto)
    
  }

  @Get()
  @Public()
  @ResponseMessage('Get products')
  findAll(@Query() queryProductDto: QueryProductDto) :Promise<PaginatedResDto<ProductResDto>> {
    return this.productsService.findAll(queryProductDto);
  }

  @Get(':id')
  @Public()
  @ResponseMessage('Get product')
  findOne(@Param('id') id: string) :Promise<ProductResDto>  {
    return this.productsService.findOne(id);
  }

  @Get('slug/:slug')
  @Public()
  @ResponseMessage('Get product by slug')
  getOneBySlug(@Param('slug') slug: string) :Promise<ProductResDto> {
    return this.productsService.getOneBySlug(slug);
  }

  @Patch(':id')
  @Public()
  @ResponseMessage('Update product')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) :Promise<ProductResDto> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Public()
  @ResponseMessage('Remove product')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) :Promise<void> {
    return this.productsService.remove(id);
  }
}
