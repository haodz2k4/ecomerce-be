
import { IRepository } from "src/common/interface/repository.interface";
import { CategoriesResDto } from "./dto/categories-res.dto";
import { PaginatedResDto } from "src/common/dto/paginated-res.dto";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { plainToInstance } from "class-transformer";


@Injectable()
export class CategoriesRepository implements IRepository<CategoriesResDto> {
    constructor(private prisma: PrismaService) {}

    async create(createDto: CreateCategoryDto): Promise<CategoriesResDto> {
        const category = await this.prisma.categories.create({
            data: createDto
        }) 
        return plainToInstance(CategoriesResDto, category)
    }

    getMany(queryDto?: unknown): Promise<PaginatedResDto<CategoriesResDto>> {
        throw new Error("Method not implemented.");
    }

    getOneById(id: string): Promise<CategoriesResDto> {
        throw new Error("Method not implemented.");
    }

    update(id: string, updateDto: UpdateCategoryDto): Promise<CategoriesResDto> {
        throw new Error("Method not implemented.");
    }

    remove(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }


}