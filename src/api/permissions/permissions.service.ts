import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionRepository } from './permissions.repository';
import { PermissionResDto } from './dto/permission-res.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';
import { QueryPermissionDto } from './dto/query-permission.dto';

@Injectable()
export class PermissionsService {

  constructor(private permissionRepository: PermissionRepository) {}

  create(createPermissionDto: CreatePermissionDto) :Promise<PermissionResDto> {
    return this.permissionRepository.create(createPermissionDto)
  }

  findAll(queryPermissionDto?: QueryPermissionDto) :Promise<PaginatedResDto<PermissionResDto>> {
    return this.permissionRepository.getMany(queryPermissionDto)
  }

  findOne(id: string) :Promise<PermissionResDto> {
    return this.permissionRepository.getOneById(id);
  }

  update(id: string, updatePermissionDto: UpdatePermissionDto) :Promise<PermissionResDto> {
    return this.permissionRepository.update(id, updatePermissionDto)
  }

  remove(id: string) :Promise<void> {
    return this.permissionRepository.remove(id)
  }
}
