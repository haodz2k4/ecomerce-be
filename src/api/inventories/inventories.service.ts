import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoriesRepository } from './inventories.repository';
import { InventoryResDto } from './dto/inventory-res.dto';
import { QueryInventoryDto } from './dto/query-inventory.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';

@Injectable()
export class InventoriesService {

  constructor(private inventoriesRepository: InventoriesRepository) {}
  create(createInventoryDto: CreateInventoryDto) :Promise<InventoryResDto> {
    return this.inventoriesRepository.create(createInventoryDto)
  }

  findAll(queryInventoryDto: QueryInventoryDto) :Promise<PaginatedResDto<InventoryResDto>> {
    return this.inventoriesRepository.getMany(queryInventoryDto);
  }

  findOne(id: string) :Promise<InventoryResDto> {
    return this.inventoriesRepository.getOneById(id)
  }

  update(id: string, updateInventoryDto: UpdateInventoryDto) :Promise<InventoryResDto> {
    return this.inventoriesRepository.update(id, updateInventoryDto)
  }

  remove(id: string) :Promise<void> {
    return this.inventoriesRepository.remove(id)
  }
}
