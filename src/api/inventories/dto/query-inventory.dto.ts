import { Type } from "class-transformer";
import { IsOptional, Min } from "class-validator";
import { QueryDto } from "src/common/dto/query.dto";


export class QueryInventoryDto extends QueryDto {

    @IsOptional()
    @Min(0)
    @Type(() => Number)
    minQuantity?: number;

    @IsOptional()
    @Min(0)
    @Type(() => Number)
    maxQuantity?: number;
}