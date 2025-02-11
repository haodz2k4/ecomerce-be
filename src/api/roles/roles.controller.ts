import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleResDto } from './dto/role-res.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { ResponseMessage } from 'src/decorator/response-message.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ResponseMessage('Create role successfully')
  create(@Body() createRoleDto: CreateRoleDto) :Promise<RoleResDto> {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ResponseMessage('Get roles successfully')
  findAll(@Query() queryRoleDto: QueryRoleDto) :Promise<PaginatedResDto<RoleResDto>> {
    return this.rolesService.findAll(queryRoleDto);
  }

  @Get(':id')
  @ResponseMessage('Get role successfully')
  findOne(@Param('id') id: string) :Promise<RoleResDto> {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update role successfully')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) :Promise<RoleResDto> {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ResponseMessage('Remove role successfully')
  remove(@Param('id') id: string) :Promise<void> {
    return this.rolesService.remove(id);
  }
}
