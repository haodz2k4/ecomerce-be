
import { IRepository } from "src/common/interface/repository.interface";
import { PaginatedResDto } from "src/common/dto/paginated-res.dto";
import { CreateInventoryDto } from "./dto/create-inventory.dto";
import { UpdateInventoryDto } from "./dto/update-inventory.dto";
import { QueryInventoryDto } from "./dto/query-inventory.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { InventoryResDto } from "./dto/inventory-res.dto";
import { plainToInstance } from "class-transformer";
import { Pagination } from "src/utils/pagination";
import { Injectable, NotFoundException } from "@nestjs/common";


@Injectable()
export class InventoriesRepository implements IRepository<InventoryResDto> {
    
    constructor(private prisma: PrismaService) {};

    async create(createDto: CreateInventoryDto): Promise<InventoryResDto> {
        const inventory = await this.prisma.inventories.create({data: createDto, include: {
            product: true
        }});
        return plainToInstance(InventoryResDto, inventory);
    }
    //total //quantity //
    async stats() {

    }

    async getMany(queryDto?: QueryInventoryDto): Promise<PaginatedResDto<InventoryResDto>> {
        
        const {
            keyword,
            page,
            limit,
            sortBy,
            sortOrder
        } = queryDto;
        const skip = queryDto.getSkip();
        const where: Record<string, unknown> = {};
        const filters = [];
        if(keyword) {
            filters.push({
                OR: [
                    {
                        supplier: {
                            contains: keyword
                        }
                    },
                    {
                        address: {
                            contains: keyword
                        }
                    }
                ]
            })
        }
        if(filters.length > 0) {
            where["AND"] = filters
        }
        const [inventories, total] = await Promise.all([
            this.prisma.inventories.findMany({
                where,
                orderBy: {
                    [sortBy]: sortOrder
                },
                take: limit,
                skip,
                include: {
                    product: true
                }
            }),
            this.getTotalDocument()
        ])
        const pagination = new Pagination(page, limit, total);
        return new PaginatedResDto(plainToInstance(InventoryResDto, inventories), pagination);
    }

    async getTotalDocument(where?: Record<string, unknown>) :Promise<number> {
        return await this.prisma.inventories.count({where})
    }
    async getOneById(id: string): Promise<InventoryResDto> {
        const inventory = await this.prisma.inventories.findUnique({
            where: {id},
            include: {
                product: true
            }
        })
        if(!inventory) {
            throw new NotFoundException("Inventory is not found");
        }
        return plainToInstance(InventoryResDto, inventory)
    }
    async  update(id: string, updateDto: UpdateInventoryDto): Promise<InventoryResDto> {
        await this.getOneById(id)
        const inventory = await this.prisma.inventories.update({
            where: {id},
            data: updateDto,
            include: {
                product: true
            }
        })

        return plainToInstance(InventoryResDto, inventory)
    }
    async remove(id: string): Promise<void> {
        await this.getOneById(id);
        await this.prisma.inventories.delete({where: {id}});
    }

}