import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryResDto } from './dto/inventory-res.dto';
import { QueryInventoryDto } from './dto/query-inventory.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';
import { ResponseMessage } from 'src/decorator/response-message.decorator';
import { Public } from 'src/decorator/public.decorator';
@Public()
@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Post()
  @ResponseMessage('Create inventory')
  create(@Body() createInventoryDto: CreateInventoryDto) :Promise<InventoryResDto> {
    return this.inventoriesService.create(createInventoryDto);
  }

  @Get()
  @ResponseMessage('Get inventories')
  findAll(@Query() queryInventoryDto: QueryInventoryDto) :Promise<PaginatedResDto<InventoryResDto>> {
    return this.inventoriesService.findAll(queryInventoryDto);
  }

  @Get(':id')
  @ResponseMessage('Get inventory')
  findOne(@Param('id') id: string) :Promise<InventoryResDto> {
    return this.inventoriesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update inventory')
  update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) :Promise<InventoryResDto> {
    return this.inventoriesService.update(id, updateInventoryDto);
  }

  @Delete(':id')
  @ResponseMessage('Remove inventory')
  remove(@Param('id') id: string) :Promise<void> {
    return this.inventoriesService.remove(id);
  }
}
