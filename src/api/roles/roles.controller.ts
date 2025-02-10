import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleResDto } from './dto/role-res.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) :Promise<RoleResDto> {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll() :Promise<PaginatedResDto<RoleResDto>> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) :Promise<RoleResDto> {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) :Promise<RoleResDto> {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) :Promise<void> {
    return this.rolesService.remove(id);
  }
}
