import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { IRepository } from "src/common/interface/repository.interface";
import { UserResDto } from "./dto/user-res.dto";
import { PaginatedResDto } from "src/common/dto/paginated-res.dto";
import { CreateUserDto } from "./dto/create-user.dto";




@Injectable()
export class UsersRepository implements IRepository<UserResDto>{

    constructor(private prisma: PrismaService) {

    }
    create(createUserDto: CreateUserDto): Promise<UserResDto> {
        throw new Error("Method not implemented.");
    }
    getMany(data?: unknown): Promise<PaginatedResDto<UserResDto>> {
        throw new Error("Method not implemented.");
    }
    getOneById(id: unknown): Promise<UserResDto> {
        throw new Error("Method not implemented.");
    }
    update(id: unknown, data: unknown): Promise<UserResDto> {
        throw new Error("Method not implemented.");
    }
    remove(id: unknown): Promise<void> {
        throw new Error("Method not implemented.");
    }
}