import { FavoriteListResDto } from "./dto/favorite-list-res.dto";
import { PaginatedResDto } from "src/common/dto/paginated-res.dto";
import { CreateFavoriteListDto } from "./dto/create-favorite-list.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { plainToInstance } from "class-transformer";
import { BadRequestException, Injectable } from "@nestjs/common";
import { QueryFavoriteListDto } from "./dto/query-favorite-list.dto";
import { Pagination } from "src/utils/pagination";

@Injectable()
export class FavoriteListRepository {

    constructor(private prisma: PrismaService) {}
    async create(userId: string,createDto: CreateFavoriteListDto): Promise<FavoriteListResDto> {
        const isExists = await this.prisma.favorite_list.findFirst({
            where: {
                userId,
                productId: createDto.productId
            }
        })
        if(isExists) {
            throw new BadRequestException("Product is already exists in favorite list")
        }
        const favoriteList = await this.prisma.favorite_list.create({
                data: {
                    userId,
                    productId: createDto.productId
                },
                include: {
                    product: true,
                    user: true
                }
            },
            
        );
        return plainToInstance(FavoriteListResDto, favoriteList);
    }
    async getMany(queryDto?: QueryFavoriteListDto): Promise<PaginatedResDto<FavoriteListResDto>> {
        const {
            productId, 
            userId,
            page,
            limit,
            sortBy,
            sortOrder
        } = queryDto;
        const skip = queryDto.getSkip()
        const where: Record<string, unknown> = {};
        if(productId) {
            where.productId = productId
        }
        if(userId) {
            where.userId = userId
        }
        const [total, favoriteList] = await Promise.all([
            this.getTotalDocument(where),
            this.prisma.favorite_list.findMany({
                where,
                take: limit,
                skip,
                orderBy: {
                    [sortBy]: sortOrder
                },
                include: {
                    product: true,
                    user: true
                }
            })
        ])

        const pagination = new Pagination(page, limit, total);
        return new PaginatedResDto(plainToInstance(FavoriteListResDto, favoriteList), pagination);
        
    }

    async getTotalDocument(where?: Record<string, unknown>) :Promise<number> {
        return this.prisma.favorite_list.count({where});
    }
    getOneById(id: unknown): Promise<FavoriteListResDto> {
        throw new Error("Method not implemented.");
    }
    update(id: unknown, updateDto: unknown): Promise<FavoriteListResDto> {
        throw new Error("Method not implemented.");
    }
    remove(id: unknown): Promise<void> {
        throw new Error("Method not implemented.");
    }


}