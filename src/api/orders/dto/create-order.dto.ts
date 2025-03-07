import { IsArray, IsEnum, IsOptional, IsPhoneNumber, IsString, IsUUID, MinLength } from "class-validator";
import { OrderStatusEnum } from "src/constants/entity.constant";
import { CreateOrderItem } from "./create-order-item.dto";


export class CreateOrderDto {

    @IsUUID()
    @IsOptional()
    userId?: string;

    @IsEnum(OrderStatusEnum)
    status: OrderStatusEnum;

    @IsString()
    address: string;

    @IsPhoneNumber('VN')
    phone: string;

    @IsArray()
    items: CreateOrderItem[];
}
