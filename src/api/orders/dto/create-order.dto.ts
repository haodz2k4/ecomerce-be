import { IsArray, IsEnum, IsPhoneNumber, IsString, IsUUID, MinLength } from "class-validator";
import { OrderStatusEnum, PaymentMethodEnum } from "src/constants/entity.constant";
import { CreateOrderItem } from "./create-order-item.dto";


export class CreateOrderDto {

    @IsEnum(PaymentMethodEnum)
    paymentMethod: PaymentMethodEnum;

    @IsEnum(OrderStatusEnum)
    status: OrderStatusEnum;

    @IsString()
    address: string;

    @IsPhoneNumber('VN')
    phone: string;

    @IsArray()
    items: CreateOrderItem[];
}
