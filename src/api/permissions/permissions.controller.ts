import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionResDto } from './dto/permission-res.dto';
import { QueryPermissionDto } from './dto/query-permission.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';
import { ResponseMessage } from 'src/decorator/response-message.decorator';
import { Public } from 'src/decorator/public.decorator';

@Public()
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ResponseMessage('Create permission successfully')
  create(@Body() createPermissionDto: CreatePermissionDto) :Promise<PermissionResDto> {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @ResponseMessage('Get permissions')
  findAll(@Query() queryPermissionDto: QueryPermissionDto) :Promise<PaginatedResDto<PermissionResDto>> {
    return this.permissionsService.findAll(queryPermissionDto);
  }

  @Get(':id')
  @ResponseMessage('Get permission')
  findOne(@Param('id') id: string) :Promise<PermissionResDto> {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update permission')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto): Promise<PermissionResDto> {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @ResponseMessage('Remove permission')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) :Promise<void> {
    return this.permissionsService.remove(id);
  }
}
