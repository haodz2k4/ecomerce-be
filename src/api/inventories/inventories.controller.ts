import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryResDto } from './dto/inventory-res.dto';
import { QueryInventoryDto } from './dto/query-inventory.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';

@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) :Promise<InventoryResDto> {
    return this.inventoriesService.create(createInventoryDto);
  }

  @Get()
  findAll(@Query() queryInventoryDto: QueryInventoryDto) :Promise<PaginatedResDto<InventoryResDto>> {
    return this.inventoriesService.findAll(queryInventoryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) :Promise<InventoryResDto> {
    return this.inventoriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) :Promise<InventoryResDto> {
    return this.inventoriesService.update(id, updateInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) :Promise<void> {
    return this.inventoriesService.remove(id);
  }
}
