import { Injectable } from "@nestjs/common";
import { IRepository } from "src/common/interface/repository.interface";
import { ProductResDto } from "./dto/product-res.dto";
import { PaginatedResDto } from "src/common/dto/paginated-res.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { plainToInstance } from "class-transformer";



@Injectable()
export class ProductsReposiory implements IRepository<ProductResDto> {

    constructor(private prisma: PrismaService) {}
    
    async create(createDto: CreateProductDto): Promise<ProductResDto> {
        const product = await this.prisma.products.create({
            data: createDto 
        })
        return plainToInstance(ProductResDto, product)
    }

    getMany(queryDto?: unknown): Promise<PaginatedResDto<ProductResDto>> {
        throw new Error("Method not implemented.");
    }

    getOneById(id: unknown): Promise<ProductResDto> {
        throw new Error("Method not implemented.");
    }

    update(id: unknown, updateDto: unknown): Promise<ProductResDto> {
        throw new Error("Method not implemented.");
    }
    
    remove(id: unknown): Promise<void> {
        throw new Error("Method not implemented.");
    }

}