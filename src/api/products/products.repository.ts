import { Injectable, NotFoundException } from "@nestjs/common";
import { IRepository } from "src/common/interface/repository.interface";
import { ProductResDto } from "./dto/product-res.dto";
import { PaginatedResDto } from "src/common/dto/paginated-res.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { plainToInstance } from "class-transformer";
import { QueryProductDto } from "./dto/query-product.dto";
import { Pagination } from "src/utils/pagination";
import { generateSlug } from "src/utils/slug";
import { ProductStatusEnum } from "src/constants/entity.constant";
import { ProductStatsResDto } from "./dto/product-stats-res.dto";
import { UpdateProductDto } from "./dto/update-product.dto";



@Injectable()
export class ProductsReposiory implements IRepository<ProductResDto> {

    constructor(private prisma: PrismaService) {}
    
    async create(createDto: CreateProductDto): Promise<ProductResDto> {
        const {title, categoryId, description, discountPercentage, price, status, thumbnail, images = []} = createDto;
        const product = await this.prisma.products.create({
            data: {
                title, 
                categoryId, 
                description, 
                discountPercentage, 
                price, 
                status,
                thumbnail,
                slug: generateSlug(title),
                images: {
                    create: images.map((item) => ({url: item}))
                }
            }
        })
        return plainToInstance(ProductResDto, product)
    }

    async stats():Promise<ProductStatsResDto> {
        const [total, active, inactive] = await Promise.all([
            this.prisma.products.count(),
            this.prisma.products.count({where: {status: ProductStatusEnum.ACTIVE}}),
            this.prisma.products.count({where: {status: ProductStatusEnum.INACTIVE}})
        ])
        return plainToInstance(ProductStatsResDto,{
            total, active, inactive
        })
    }
    async getMany(queryDto?: QueryProductDto): Promise<PaginatedResDto<ProductResDto>> {
        
        const {
            status,
            categoryId,
            keyword,
            page,
            limit,
            sortBy,
            sortOrder,
            categorySlug
        } = queryDto;
        const skip = queryDto.getSkip()
        const where: Record<string, unknown> = {};
        const filters = [];
        if(status) {
            filters.push({
                status
            })
        }
        if(categoryId) {
            filters.push({
                categoryId
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
        if(categorySlug) {
            filters.push({
                category: {
                    slug: categorySlug
                }
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
                    take: limit,
                    include: {
                        category: true
                    }
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
        const product = await this.prisma.products.findUnique({
            where: {id},
            include: {
                category: true
            }
        });
        if(!product) {
            throw new NotFoundException("Product is not found")
        }
        return plainToInstance(ProductResDto, product);
    }

    async getOneBySlug(slug: string): Promise<ProductResDto> {
        const product = await this.prisma.products.findUnique({
            where: {slug},
            include: {
                category: true
            }
        })
        if(!product) {
            throw new NotFoundException("Product is not found")
        }

        return plainToInstance(ProductResDto, product);
    }

    async update(id: string, updateDto: UpdateProductDto): Promise<ProductResDto> {
        await this.getOneById(id)
        const {images = []} = updateDto
        const product = await this.prisma.products.update({
            where: {id}, 
            data: {
                ...updateDto,
                images: {
                    create: images.map((item) => ({url: item}))
                }
            }
        });
        if(!product) {
            throw new NotFoundException("Product is not found")
        }
        return plainToInstance(ProductResDto, product)
    }
    
    async remove(id: string): Promise<void> {
        await this.getOneById(id);
        await this.prisma.products.delete({where: {id}})
    }

    async removeMultiImage(productId: string, ids: number[]) :Promise<void> {
        await this.prisma.products_images.deleteMany({where: {id: {in: ids}, productId }})
    }
}