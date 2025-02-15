import { IsEnum, IsOptional } from "class-validator";
import { QueryDto } from "src/common/dto/query.dto";
import { CategoryStatusEnum } from "src/constants/entity.constant";


export class QueryCategoryDto extends QueryDto {

    @IsEnum(CategoryStatusEnum)
    @IsOptional()
    status?: CategoryStatusEnum;
}