import { IsOptional, IsUUID } from "class-validator";
import { QueryDto } from "src/common/dto/query.dto";


export class QueryFavoriteListDto extends QueryDto {

    @IsUUID()
    @IsOptional()
    productId?: string;

    @IsUUID()
    @IsOptional()
    userId?: string;

}