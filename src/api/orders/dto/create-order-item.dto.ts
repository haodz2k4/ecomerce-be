import { IsNumber, IsUUID } from "class-validator";


export class CreateOrderItem {

    @IsUUID()
    productId: string;

    @IsUUID()
    orderId: string;

    @IsNumber()
    price: number;

    @IsNumber()
    quantity: number;
}