import { IRepository } from './../../../dist/common/interface/repository.interface.d';
import { Injectable } from "@nestjs/common";
import { PermissionResDto } from './dto/permission-res.dto';
import { PaginatedResDto } from 'dist/common/dto/paginated-res.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { QueryPermissionDto } from './dto/query-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class PermissionRepository implements IRepository<PermissionResDto> {

    constructor(private prisma: PrismaService) {}
    create(createDto: CreatePermissionDto): Promise<PermissionResDto> {
        throw new Error('Method not implemented.');
    }
    getMany(queryDto?: QueryPermissionDto): Promise<PaginatedResDto<PermissionResDto>> {
        throw new Error('Method not implemented.');
    }
    getOneById(id: string): Promise<PermissionResDto> {
        throw new Error('Method not implemented.');
    }
    update(id: string, updateDto: UpdatePermissionDto): Promise<PermissionResDto> {
        throw new Error('Method not implemented.');
    }
    remove(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

}