import { PrismaClient } from "@prisma/client";
import { IRepository } from "src/common/interface/repository.interface";
import { CategoriesResDto } from "./dto/categories-res.dto";
import { PaginatedResDto } from "src/common/dto/paginated-res.dto";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";



export class CategoriesRepository implements IRepository<CategoriesResDto> {
    constructor(private prisma: PrismaClient) {}

    create(createDto: CreateCategoryDto): Promise<CategoriesResDto> {
        throw new Error("Method not implemented.");
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