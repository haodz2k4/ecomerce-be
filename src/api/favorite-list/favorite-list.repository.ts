import { FavoriteListResDto } from "./dto/favorite-list-res.dto";
import { PaginatedResDto } from "src/common/dto/paginated-res.dto";
import { CreateFavoriteListDto } from "./dto/create-favorite-list.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { plainToInstance } from "class-transformer";
import { BadRequestException, Injectable } from "@nestjs/common";

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
    getMany(queryDto?: unknown): Promise<PaginatedResDto<FavoriteListResDto>> {
        throw new Error("Method not implemented.");
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