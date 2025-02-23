
import { IRepository } from "src/common/interface/repository.interface";
import { PaginatedResDto } from "src/common/dto/paginated-res.dto";
import { CreateInventoryDto } from "./dto/create-inventory.dto";
import { UpdateInventoryDto } from "./dto/update-inventory.dto";
import { QueryInventoryDto } from "./dto/query-inventory.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { InventoryResDto } from "./dto/inventory-res.dto";
import { plainToInstance } from "class-transformer";
import { Pagination } from "src/utils/pagination";
import { Injectable } from "@nestjs/common";


@Injectable()
export class InventoriesRepository implements IRepository<InventoryResDto> {
    
    constructor(private prisma: PrismaService) {};

    async create(createDto: CreateInventoryDto): Promise<InventoryResDto> {
        const inventory = await this.prisma.inventories.create({data: createDto});
        return plainToInstance(InventoryResDto, inventory);
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
                skip
            }),
            this.getTotalDocument()
        ])

        const pagination = new Pagination(page, limit, total);
        return new PaginatedResDto(plainToInstance(InventoryResDto, inventories), pagination);
    }

    async getTotalDocument(where?: Record<string, unknown>) :Promise<number> {
        return await this.prisma.inventories.count({where})
    }
    getOneById(id: string): Promise<InventoryResDto> {
        throw new Error("Method not implemented.");
    }
    update(id: string, updateDto: UpdateInventoryDto): Promise<InventoryResDto> {
        throw new Error("Method not implemented.");
    }
    remove(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}