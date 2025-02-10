import { IsEnum, IsOptional } from "class-validator"
import { QueryDto } from "src/common/dto/query.dto"
import { RoleStatusEnum } from "src/constants/entity.constant"


export class QueryRoleDto extends QueryDto {

    @IsEnum(RoleStatusEnum)
    @IsOptional()
    status: RoleStatusEnum;

}