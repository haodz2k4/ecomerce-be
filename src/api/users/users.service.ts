import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './user.repository';
import { UserResDto } from './dto/user-res.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';

@Injectable()
export class UsersService {

  constructor(private readonly userRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto): Promise<UserResDto> {
    return this.userRepository.create(createUserDto)
  }

  findAll(queryUserDto: QueryUserDto): Promise<PaginatedResDto<UserResDto>> {
    return this.userRepository.getMany(queryUserDto);
  }

  findOne(id: string): Promise<UserResDto> {
    return this.userRepository.getOneById(id)
  }

  update(id: string, updateUserDto: UpdateUserDto) :Promise<UserResDto> {
    return this.userRepository.update(id, updateUserDto)
  }

  remove(id: string): Promise<void> {
    return this.userRepository.remove(id)
  }
}
