import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResDto } from './dto/product-res.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';
import { Public } from 'src/decorator/public.decorator';
import { QueryProductDto } from './dto/query-product.dto';
import { ResponseMessage } from 'src/decorator/response-message.decorator';
import { ProductStatsResDto } from './dto/product-stats-res.dto';

@Public()
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

  @Get('stats')
  stats(): Promise<ProductStatsResDto> {
    return this.productsService.stats()
  }

  @Post()
  @Public()
  @ResponseMessage('Create product')
  create(@Body() createProductDto: CreateProductDto) :Promise<ProductResDto> {
    return this.productsService.create(createProductDto);
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
