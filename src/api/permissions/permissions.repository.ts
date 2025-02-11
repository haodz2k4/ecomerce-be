import { IRepository } from '../../common/interface/repository.interface';
import { Injectable, NotFoundException } from "@nestjs/common";
import { PermissionResDto } from './dto/permission-res.dto';
import { PaginatedResDto } from '../../common/dto/paginated-res.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { QueryPermissionDto } from './dto/query-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Pagination } from 'src/utils/pagination';



@Injectable()
export class PermissionRepository implements IRepository<PermissionResDto> {

    constructor(private prisma: PrismaService) {}

    async create(createDto: CreatePermissionDto): Promise<PermissionResDto> {
        const permission = await this.prisma.permissions.create({data: createDto});
        return plainToInstance(PermissionResDto, permission)
    }

    async getMany(queryDto?: QueryPermissionDto): Promise<PaginatedResDto<PermissionResDto>> {
        const {
            keyword,
            page,
            limit,
            sortBy,
            sortOrder
        } = queryDto;
        const skip = queryDto.getSkip()
        const where: Record<string, unknown> = {}
        const filters = [];

        if(keyword) {
            where["OR"] = {
                name: {constants: keyword},
                resource: {constants: keyword}
            }
        }
        //range created at
        const rangeCreatedAt = queryDto.getRangeCreatedAt();
        if(rangeCreatedAt) {
            filters.push({
                createdAt: rangeCreatedAt
            })
        }
        //Range updated at
        const rangeUpdatedAt = queryDto.getRangeUpdatedAt();
        if(rangeUpdatedAt) {
            filters.push({
                updatedAt: rangeUpdatedAt
            })
        }
        if(filters.length > 0) {
            where["AND"] = filters
        }
        const [permissions, total] = await Promise.all(
            [
                this.prisma.permissions.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: {[sortBy]: sortOrder}
                }),
                this.totalDocument(where)
            ]
        );

        const pagination = new Pagination(page, limit, total);
        return new PaginatedResDto(plainToInstance(PermissionResDto, permissions), pagination)
    }

    async totalDocument(where?: Record<string, unknown>): Promise<number> {
        return this.prisma.permissions.count({where: where})
    }

    async getOneById(id: string): Promise<PermissionResDto> {
        const permission = await this.prisma.permissions.findFirst({where: {id}});
        if(!permission) {
            throw new NotFoundException("Permissions is not found")
        }
        return plainToInstance(PermissionResDto, permission);
    }

    async update(id: string, updateDto: UpdatePermissionDto): Promise<PermissionResDto> {
        await this.getOneById(id);
        const permission = await this.prisma.permissions.update({where: {id}, data: updateDto})
        return plainToInstance(PermissionResDto, permission);
    }

    async remove(id: string): Promise<void> {
        await this.getOneById(id)
        await this.prisma.permissions.delete({where: {id}});
    }

}