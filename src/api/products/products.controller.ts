import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResDto } from './dto/product-res.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) :Promise<ProductResDto> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() :Promise<PaginatedResDto<ProductResDto>> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) :Promise<ProductResDto>  {
    return this.productsService.findOne(id);
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
