import { IsEnum, IsString } from "class-validator";
import { PermissionNameEnum } from "src/constants/entity.constant";


export class CreatePermissionDto {

    @IsEnum(PermissionNameEnum)
    name: PermissionNameEnum;

    @IsString()
    resource: string;
}
