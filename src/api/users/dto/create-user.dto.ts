import { IsDate, IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { UserGenderEnum, UserStatusEnum } from "src/constants/entity.constant";


export class CreateUserDto {

    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    @IsEnum(UserGenderEnum)
    @IsOptional()
    gender?: UserGenderEnum;

    @IsEnum(UserStatusEnum)
    @IsOptional()
    status?: UserStatusEnum;

    @IsString()
    roleId: string;

    @IsDate()
    @IsOptional()
    birthDate: Date;
}
