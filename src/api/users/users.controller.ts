import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UserResDto } from './dto/user-res.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) :Promise<UserResDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() queryUserDto: QueryUserDto) :Promise<PaginatedResDto<UserResDto>> {
    return this.usersService.findAll(queryUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserResDto> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) :Promise<UserResDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
