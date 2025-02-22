import { Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './user.repository';
import { UserResDto } from './dto/user-res.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { PaginatedResDto } from 'src/common/dto/paginated-res.dto';
import { Sessions, Users } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { plainToInstance } from 'class-transformer';
import { UploadResDto } from './dto/upload-res.dto';
import { ChangePasswordUserDto } from './dto/change-password-user.dto';

@Injectable()
export class UsersService {

  constructor(
    private readonly userRepository: UsersRepository,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async createUserSession(userId: string, expiresIn: Date): Promise<Sessions> {
    return this.userRepository.createUserSession(userId, expiresIn)
  }

  async changePassword(id: string, @Body() changePasswordUserDto: ChangePasswordUserDto) :Promise<void> {
    return this.userRepository.changePassword(id, changePasswordUserDto)
  }

  async uploadAvatar(id: string,file: Express.Multer.File) {
    const data = await this.cloudinaryService.uploadSingle(file);
    await this.userRepository.update(id, {
      avatar: data.secure_url
    })
    return plainToInstance(UploadResDto, {avatar: data.secure_url})
  }

  create(createUserDto: CreateUserDto): Promise<UserResDto> {
    return this.userRepository.create(createUserDto)
  }

  findAll(queryUserDto: QueryUserDto): Promise<PaginatedResDto<UserResDto>> {
    return this.userRepository.getMany(queryUserDto);
  }

  updatePassword(id: string, password: string) : Promise<UserResDto> {
    return this.userRepository.updatePassword(id, password)
  }

  findOne(id: string): Promise<UserResDto> {
    return this.userRepository.getOneById(id)
  }

  getUserByEmail(email: string): Promise<Users> {
    return this.userRepository.getUserByEmail(email);
  }

  update(id: string, updateUserDto: UpdateUserDto) :Promise<UserResDto> {
    return this.userRepository.update(id, updateUserDto)
  }

  remove(id: string): Promise<void> {
    return this.userRepository.remove(id)
  }
}
