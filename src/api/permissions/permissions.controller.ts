import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionResDto } from './dto/permission-res.dto';
import { QueryPermissionDto } from './dto/query-permission.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) :Promise<PermissionResDto> {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  findAll(@Query() queryPermissionDto: QueryPermissionDto) :Promise<PaginatedResDto<PermissionResDto>> {
    return this.permissionsService.findAll(queryPermissionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) :Promise<PermissionResDto> {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto): Promise<PermissionResDto> {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) :Promise<void> {
    return this.permissionsService.remove(id);
  }
}
