import { IsEnum, IsOptional, IsString } from "class-validator";
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

}
