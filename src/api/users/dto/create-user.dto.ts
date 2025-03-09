import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { UserGenderEnum, UserStatusEnum } from "src/constants/entity.constant";


export class CreateUserDto {

    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password?: string;

    @IsString()
    @IsOptional()
    avatar?: string;

    @IsEnum(UserGenderEnum)
    @IsOptional()
    gender?: UserGenderEnum;

    @IsEnum(UserStatusEnum)
    @IsOptional()
    status?: UserStatusEnum;

    @IsString()
    roleId: string;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    birthDate?: Date;

    @IsBoolean()
    @Type(() => Boolean)
    verified?: boolean;

}
