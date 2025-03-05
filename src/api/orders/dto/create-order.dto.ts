import { IsArray, IsEnum, IsOptional, IsUUID, MinLength } from "class-validator";
import { OrderStatusEnum } from "src/constants/entity.constant";
import { CreateOrderItem } from "./create-order-item.dto";


export class CreateOrderDto {

    @IsUUID()
    @IsOptional()
    userId?: string;

    @IsEnum(OrderStatusEnum)
    status: OrderStatusEnum;

    @IsArray()
    items: CreateOrderItem[];
}
