import { BadRequestException, Body, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { IRepository } from "src/common/interface/repository.interface";
import { UserResDto } from "./dto/user-res.dto";
import { PaginatedResDto } from "src/common/dto/paginated-res.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { plainToInstance } from "class-transformer";
import { QueryUserDto } from "./dto/query-user.dto";
import { Pagination } from "src/utils/pagination";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Sessions, Users } from "@prisma/client";
import { ChangePasswordUserDto } from "./dto/change-password-user.dto";
import { verifyPassword } from "src/utils/password.util";
import { CreateUserProvider } from "./dto/create-user-provider.dto";
import { UserProviderResDto } from "./dto/user-provider-res.dto";
import { UserProviderEnum } from "src/constants/entity.constant";



@Injectable()
export class UsersRepository implements IRepository<UserResDto>{

    constructor(private prisma: PrismaService) {}

    async getUserProvider(providerId: string, provider: UserProviderEnum): Promise<UserProviderResDto> {
        const userProvider = await this.prisma.user_providers.findUnique({
            where: {
                providerId,
                provider
            }
        })
        return plainToInstance(UserProviderResDto, userProvider);
    }

    async createUserProvider(createUserProvider: CreateUserProvider) :Promise<UserProviderResDto> {
        const {userId} = createUserProvider;
        const user = await this.prisma.users.findUnique({where: {id: userId}});
        if(!user) throw new NotFoundException(`User with ${userId} is not found`);
        const userProvider = await this.prisma.user_providers.create({data: createUserProvider});
        return plainToInstance(UserProviderResDto, userProvider)
    }

    async createUserSession(userId: string, expiresIn: Date): Promise<Sessions> {
        return this.prisma.sessions.create({data: {
            expiresIn,
            userId
        }})
    }

    async changePassword(id: string, @Body() changePasswordUserDto: ChangePasswordUserDto) :Promise<void> {
        const {currentPassword, newPassword} = changePasswordUserDto;
        const user = await this.prisma.users.findUnique({where: {id}});
        const isTrue = await verifyPassword(currentPassword, user.password);
        if(!isTrue) {
            throw new UnauthorizedException("Password is invalid")
        }
        await this.prisma.users.update({where: {id}, data: {password: newPassword}});
      }

    async create(createUserDto: CreateUserDto): Promise<UserResDto> {
        const {email} = createUserDto;
        const isExists = await this.getUserByEmail(email);
        if(isExists) {
            throw new BadRequestException("Email is already taken")
        }
        const user = await this.prisma.users.create({data: createUserDto});
        return plainToInstance(UserResDto, user);
    }

    async getUserByEmail(email: string): Promise<Users | null> {
        return await this.prisma.users.findFirst({
            where: {email}
        })
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
        //Range birth Date
        const rangeBirthDate = queryUserDto.getRangeBirthDate();
        if(rangeBirthDate) {
            filters.push(
                {
                    birthDate: rangeBirthDate
                }
            )
        }

        //range createdAt 
        const rangeCreatedAt = queryUserDto.getRangeCreatedAt();
        if(rangeCreatedAt) {
            filters.push(
                {
                    createdAt: rangeCreatedAt 
                }
            )
        } 
        //range updatedAt 
        const rangeUpdatedAt = queryUserDto.getRangeUpdatedAt()
        if(rangeUpdatedAt) {
            filters.push({
                updatedAt: rangeUpdatedAt
            })
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

    async getOneById(id: unknown): Promise<UserResDto> {
        const user = await this.prisma.users.findFirst({where: {id}});
        if(!user) {
            throw new NotFoundException("User is not found");
        }
        return plainToInstance(UserResDto, user);
    }

    async updatePassword(id: string, password: string): Promise<UserResDto> {
        await this.getOneById(id);
        const user = await this.prisma.users.update({where: {id}, data: {password}});
        return plainToInstance(UserResDto, user)
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResDto> {
        await this.getOneById(id)
        const user = await this.prisma.users.update({where: {id}, data: updateUserDto});
        return plainToInstance(UserResDto, user);
    }

    async remove(id: string): Promise<void> {
        await this.getOneById(id);
        await this.prisma.users.delete({where: {id}});
    }
}