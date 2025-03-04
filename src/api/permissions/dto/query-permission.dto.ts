import { IsEnum, IsOptional, IsString } from "class-validator";
import { QueryDto } from "src/common/dto/query.dto";
import { PermissionNameEnum, PermissionResourceEnum } from "src/constants/entity.constant";





export class QueryPermissionDto extends QueryDto {

    @IsEnum(PermissionNameEnum)
    @IsOptional()
    name?: PermissionNameEnum;

    @IsString()
    @IsOptional()
    @IsEnum(PermissionResourceEnum)
    resource?: PermissionResourceEnum;

}