import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { IRepository } from "src/common/interface/repository.interface";
import { UserResDto } from "./dto/user-res.dto";
import { PaginatedResDto } from "src/common/dto/paginated-res.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { plainToInstance } from "class-transformer";
import { hashPassword } from "src/utils/password.util";




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