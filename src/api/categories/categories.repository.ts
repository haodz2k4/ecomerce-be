
import { IRepository } from "src/common/interface/repository.interface";
import { CategoriesResDto } from "./dto/categories-res.dto";
import { PaginatedResDto } from "src/common/dto/paginated-res.dto";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { plainToInstance } from "class-transformer";
import { QueryCategoryDto } from "./dto/query-category.dto";
import { Pagination } from "src/utils/pagination";


@Injectable()
export class CategoriesRepository implements IRepository<CategoriesResDto> {
    constructor(private prisma: PrismaService) {}

    async create(createDto: CreateCategoryDto): Promise<CategoriesResDto> {
        const category = await this.prisma.categories.create({
            data: createDto
        }) 
        return plainToInstance(CategoriesResDto, category)
    }

    async getMany(queryDto?: QueryCategoryDto): Promise<PaginatedResDto<CategoriesResDto>> {
        const  {
            status,
            keyword,
            page,
            limit,
            sortBy,
            sortOrder
        }  = queryDto

        const skip = queryDto.getSkip()
        const where: Record<string, unknown> = {};
        const filters = [];
        if(keyword) {
            filters.push({title: {contains: keyword}})
        }
        if(status) {
            filters.push({status})
        }
        const rangeCreatedAt = queryDto.getRangeCreatedAt();
        if(rangeCreatedAt) {
            filters.push({createdAt: rangeCreatedAt})
        }

        const rangeUpdateAt = queryDto.getRangeUpdatedAt();
        if(rangeUpdateAt) {
            filters.push({updatedAt: rangeUpdateAt});
        }
        if(filters.length > 0) {
            where["AND"] = filters
        }
        const [categories, total] = await Promise.all([
            this.prisma.categories.findMany({
                where,
                take: limit,
                skip,
                orderBy: {
                    [sortBy]: sortOrder
                }
            }),
            this.getTotalDocument(where)
        ])

        const pagination = new Pagination(page, limit, total);
        return new PaginatedResDto(plainToInstance(CategoriesResDto, categories), pagination)

    }

    async getTotalDocument(where?: Record<string, unknown>) :Promise<number> {
        return await this.prisma.categories.count({where})
    }

    async getOneById(id: string): Promise<CategoriesResDto> {
        const category = await this.prisma.categories.findUnique({where: {id}});
        if(!category) {
            throw new NotFoundException("Category is not found");
        }
        return plainToInstance(CategoriesResDto, category);
    }   

    async update(id: string, updateDto: UpdateCategoryDto): Promise<CategoriesResDto> {
        await this.getOneById(id);
        const category = await this.prisma.categories.update({where: {id}, data: updateDto});
        return plainToInstance(CategoriesResDto, category);
    }

    remove(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }


}