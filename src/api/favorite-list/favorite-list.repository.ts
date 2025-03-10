import { IRepository } from "src/common/interface/repository.interface";
import { FavoriteListResDto } from "./dto/favorite-list-res.dto";
import { PaginatedResDto } from "src/common/dto/paginated-res.dto";
import { CreateFavoriteListDto } from "./dto/create-favorite-list.dto";
import { PrismaService } from "src/prisma/prisma.service";


export class FavoriteListRepository implements IRepository<FavoriteListResDto> {

    constructor(private prisma: PrismaService) {}
    create(createDto: CreateFavoriteListDto): Promise<FavoriteListResDto> {
        
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