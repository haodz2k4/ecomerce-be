import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { IRepository } from "src/common/interface/repository.interface";
import { UserResDto } from "./dto/user-res.dto";
import { PaginatedResDto } from "src/common/dto/paginated-res.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { plainToInstance } from "class-transformer";
import { hashPassword } from "src/utils/password.util";
import { QueryUserDto } from "./dto/query-user.dto";
import { Pagination } from "src/utils/pagination";




@Injectable()
export class UsersRepository implements IRepository<UserResDto>{

    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<UserResDto> {
        const {
            fullName,
            email,
            password,
            gender,
            status,
            birthDate 
        } = createUserDto;
        const isExistsEmail = await this.prisma.users.findFirst({
            where: {email}
        })
        if(isExistsEmail){
            throw new BadRequestException("Email is already taken");
        }
        const user = await this.prisma.users.create({data: {
            fullName,
            email,
            password: await hashPassword(password),
            gender,
            status,
            birthDate 
        }});
        return plainToInstance(UserResDto, user);
    }
    
    async getMany(queryUserDto: QueryUserDto): Promise<PaginatedResDto<UserResDto>> {
        const {
            keyword,
            page,
            limit,
            sortBy,
            sortOrder,
            gender,
            status
        } = queryUserDto;
        const skip = queryUserDto.getSkip();
        const filters: Record<string, unknown>[] = [];
        
        //KEYWORD
        if(keyword) {
            filters.push(
                {
                    fullName: {
                        contains: keyword
                    }
                }
            )
        }
        //GENDER
        if(gender) {
            filters.push(
                {
                    gender: {
                        equals: gender
                    }
                }
            )
        }
        //STATUS
        if(status) {
            filters.push(
                {
                    status: {
                        equals: status
                    }
                }
            )
        }

        const where: Record<string, unknown> = {}
        if(filters.length > 0) {
            where["AND"] = filters
        }
        const [users, total] = await Promise.all([
            this.prisma.users.findMany({
                where,
                orderBy: {
                    [sortBy]: sortOrder
                },
                take: limit,
                skip
            }),
            this.getTotalDocument(where)
        ])
        
        const pagination = new Pagination(page, limit,total);
        return new PaginatedResDto(plainToInstance(UserResDto, users), pagination);
    }

    async getTotalDocument(where?: Record<string, unknown>): Promise<number> {
        
        return await this.prisma.users.count({where})
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