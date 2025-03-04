import { Injectable, NotFoundException } from "@nestjs/common";
import { IRepository } from "src/common/interface/repository.interface";
import { RoleResDto } from "./dto/role-res.dto";
import { PaginatedResDto } from "src/common/dto/paginated-res.dto";
import { CreateRoleDto } from "./dto/create-role.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { plainToInstance } from "class-transformer";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { QueryRoleDto } from "./dto/query-role.dto";
import { Pagination } from "src/utils/pagination";


@Injectable()
export class RolesRepository implements IRepository<RoleResDto> {

    constructor(private prisma: PrismaService) {}

    async create(createDto: CreateRoleDto): Promise<RoleResDto> {
        const {
            title,
            description,
            status,
            permissionIds = []
        } = createDto;
        const permissions = permissionIds.map((item: string) => ({permissionId: item}));
        const role = await this.prisma.roles.create({
            data: {
                title,
                description,
                status,
                permissions: {
                    create: permissions
                }
            },
            include: {
                permissions: {
                    select: {
                        permission: true
                    }
                }
            }
        })
        return plainToInstance(RoleResDto, role);
    }

    async getMany(queryDto?: QueryRoleDto): Promise<PaginatedResDto<RoleResDto>> {
        const  {
            status,
            keyword,
            page,
            limit,
            sortBy,
            sortOrder
        } =  queryDto;

        const skip = queryDto.getSkip()
        const where: Record<string, unknown> = {};
        const finds = [];
        //Status 
        if(status) {
            finds.push({
                status 
            })
        }
        //Keyword 
        if(keyword) {
            finds.push({
                title: {
                    contains: keyword
                }
            })
        }

        if(finds.length > 0) {
            where["AND"] = finds 
        }
        const [roles, total] = await Promise.all([
            await this.prisma.roles.findMany({
                where,
                orderBy: {[sortBy]: sortOrder},
                take: limit,
                skip,
                include: {
                    permissions: {
                        select: {
                            permission: true
                        }
                    }
                }
            }),
            await this.getTotalDocument(where)
        ])
        const pagination = new Pagination(page, limit,total);
        return new PaginatedResDto(plainToInstance(RoleResDto, roles),pagination)
    }

    async getTotalDocument(where: Record<string, unknown>): Promise<number> {
        return await this.prisma.roles.count({where})
    }

    async getOneById(id: string): Promise<RoleResDto> {
        const role = await this.prisma.roles.findUnique({
            where: { id },
            include: {
                permissions: {
                    select: {
                        permission: true,
                    },
                },
            },
        });
        if(!role) {
            throw new NotFoundException("Role is not found");
        }
        return plainToInstance(RoleResDto, role);
    }

    async update(id: string, updateDto: UpdateRoleDto): Promise<RoleResDto> {
        await this.getOneById(id);
        const role = await this.prisma.roles.update({
            where: {id},
            data: updateDto,
            include: {
                permissions: {
                    select: {
                        permission: true
                    }
                }
            }
        });

        return plainToInstance(RoleResDto, role);
    }

    async remove(id: string): Promise<void> {
        await this.getOneById(id);
        await this.prisma.roles.delete({where: {id}})
    }

}