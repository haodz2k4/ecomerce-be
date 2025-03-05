import { IsEnum, IsNumber, IsOptional, IsUUID } from "class-validator";
import { QueryDto } from "src/common/dto/query.dto";
import { OrderStatusEnum } from "src/constants/entity.constant";


export class QueryOrderDto extends QueryDto {

    @IsUUID()
    @IsOptional()
    userId?: string;

    @IsEnum(OrderStatusEnum)
    @IsOptional()
    status?: OrderStatusEnum;

    @IsNumber()
    @IsOptional()
    minTotalPrice?: number;

    @IsNumber()
    @IsOptional()
    maxTotalPrice?: number;

    @IsNumber()
    @IsOptional()
    minOrderCount?: number;

    @IsNumber()
    @IsOptional()
    maxOrderCount?: number;

}