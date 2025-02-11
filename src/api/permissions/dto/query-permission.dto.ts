import { IsEnum, IsOptional, IsString } from "class-validator";
import { QueryDto } from "src/common/dto/query.dto";
import { PermissionNameEnum } from "src/constants/entity.constant";





export class QueryPermissionDto extends QueryDto {

    @IsEnum(PermissionNameEnum)
    @IsOptional()
    name?: PermissionNameEnum;

    @IsString()
    @IsOptional()
    resource?: string;

}