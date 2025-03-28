import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UserResDto } from './dto/user-res.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';
import { ResponseMessage } from 'src/decorator/response-message.decorator';
import { User } from 'src/decorator/user.decorator';
import { ChangePasswordUserDto } from './dto/change-password-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ResponseMessage('Create user successfully')
  create(@Body() createUserDto: CreateUserDto) :Promise<UserResDto> {
    return this.usersService.create(createUserDto);
  }

  @Post('me/change-password')
  @ResponseMessage('Change password successfully')
  changePassword(@User('id') id: string, @Body() changePasswordUserDto: ChangePasswordUserDto) :Promise<void> {
    return this.usersService.changePassword(id, changePasswordUserDto)
  }

  @Get()
  @ResponseMessage('Get users successfully')
  findAll(@Query() queryUserDto: QueryUserDto) :Promise<PaginatedResDto<UserResDto>> {
    return this.usersService.findAll(queryUserDto);
  }

  @Get('me')
  @ResponseMessage('Get current user')
  getCurrentUser(@User('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Get(':id')
  @ResponseMessage('Get user by id successfully')
  findOne(@Param('id') id: string): Promise<UserResDto> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update user successfully')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) :Promise<UserResDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ResponseMessage('Remove user successfully')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
