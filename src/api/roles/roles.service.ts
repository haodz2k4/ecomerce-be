import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesRepository } from './roles.repository';
import { RoleResDto } from './dto/role-res.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';

@Injectable()
export class RolesService {

  constructor(private rolesRepository: RolesRepository) {}

  create(createRoleDto: CreateRoleDto): Promise<RoleResDto> {
    return this.rolesRepository.create(createRoleDto)
  }

  findAll(queryRoleDto?: QueryRoleDto): Promise<PaginatedResDto<RoleResDto>> {
    return this.rolesRepository.getMany(queryRoleDto)
  }

  findOne(id: string) :Promise<RoleResDto> {
    return this.rolesRepository.getOneById(id)
  }

  update(id: string, updateRoleDto: UpdateRoleDto) :Promise<RoleResDto> {
    return this.rolesRepository.update(id, updateRoleDto)
  }

  remove(id: string) :Promise<void> {
    return this.rolesRepository.remove(id)
  }
}
