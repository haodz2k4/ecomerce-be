import { IsEnum, IsOptional } from "class-validator";
import { QueryDto } from "src/common/dto/query.dto";
import { ProductStatusEnum } from "src/constants/entity.constant";


export class QueryProductDto extends QueryDto {
    
    @IsOptional()
    @IsEnum(ProductStatusEnum)
    status?: ProductStatusEnum;
}