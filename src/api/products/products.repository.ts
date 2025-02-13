import { Injectable, NotFoundException } from "@nestjs/common";
import { IRepository } from "src/common/interface/repository.interface";
import { ProductResDto } from "./dto/product-res.dto";
import { PaginatedResDto } from "src/common/dto/paginated-res.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { plainToInstance } from "class-transformer";
import { QueryProductDto } from "./dto/query-product.dto";
import { Pagination } from "src/utils/pagination";



@Injectable()
export class ProductsReposiory implements IRepository<ProductResDto> {

    constructor(private prisma: PrismaService) {}
    
    async create(createDto: CreateProductDto): Promise<ProductResDto> {
        const product = await this.prisma.products.create({
            data: createDto
        })
        return plainToInstance(ProductResDto, product)
    }

    async getMany(queryDto?: QueryProductDto): Promise<PaginatedResDto<ProductResDto>> {
        
        const {
            status,
            keyword,
            page,
            limit,
            sortBy,
            sortOrder
        } = queryDto;
        const skip = queryDto.getSkip()
        const where: Record<string, unknown> = {};
        const filters = [];
        if(status) {
            filters.push({
                status
            })
        }
        if(keyword) {
            filters.push({
                title: {
                    contains: keyword 
                }
            })
        }

        const rangeCreatedAt = queryDto.getRangeCreatedAt()
        if(rangeCreatedAt) {
            filters.push({
                createdAt: rangeCreatedAt
            })
        }

        const rangeUpdatedAt = queryDto.getRangeUpdatedAt()
        if(rangeUpdatedAt) {
            filters.push({
                updatedAt: rangeUpdatedAt
            })
        }

        const rangePrice = queryDto.getRangePrice();
        if(rangePrice) {
            filters.push({
                price: rangePrice
            })
        }

        const rangePercentage = queryDto.getRangePercentage()
        if(rangePercentage) {
            filters.push({
                discountPercentage: rangePercentage
            })
        }
        if(filters.length > 0) {
            where["AND"] = filters
        }
        const [products, total] = await Promise.all(
            [
                this.prisma.products.findMany({
                    where,
                    orderBy: {[sortBy]: sortOrder},
                    skip,
                    take: limit
                }),
                this.totalDocument(where)
            ]
        )

        const pagination = new Pagination(page, limit,total );
        return new PaginatedResDto(plainToInstance(ProductResDto, products), pagination)
    }

    async totalDocument(where?: Record<string, unknown>): Promise<number> {
        return await this.prisma.products.count({where})
    }

    async getOneById(id: string): Promise<ProductResDto> {
        const product = await this.prisma.products.findUnique({where: {id}});
        if(!product) {
            throw new NotFoundException("Product is not found")
        }

        return plainToInstance(ProductResDto, product);
    }

    async updateProductImage(id: string, urlThumbnail: string, urlImages: string[]) {
        await this.getOneById(id);
        await this.prisma.products.update({where: {id}, data: {thumbnail: urlThumbnail}});
        await this.prisma.products_images.createMany({
            data: urlImages.map((item) => ({
                url: item,
                productId: id
            }))
        })
    }

    async getOneBySlug(slug: string): Promise<ProductResDto> {
        const product = await this.prisma.products.findUnique({where: {slug}})
        if(!product) {
            throw new NotFoundException("Product is not found")
        }

        return plainToInstance(ProductResDto, product);
    }

    async update(id: string, updateDto: unknown): Promise<ProductResDto> {
        await this.getOneById(id)
        const product = await this.prisma.products.update({where: {id}, data: updateDto});
        if(!product) {
            throw new NotFoundException("Product is not found")
        }
        return plainToInstance(ProductResDto, product)
    }
    
    remove(id: unknown): Promise<void> {
        throw new Error("Method not implemented.");
    }

}