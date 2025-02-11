import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";
import { UserStatusEnum } from "src/constants/entity.constant";


export class CreateRoleDto {

    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(UserStatusEnum)
    @IsOptional()
    status?: UserStatusEnum;

    @IsArray()
    @IsOptional()
    permissionIds: string[];

}
