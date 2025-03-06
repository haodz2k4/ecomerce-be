import { IsNumber, IsUUID } from "class-validator";


export class CreateOrderItem {

    @IsUUID()
    productId: string;

    @IsNumber()
    quantity: number;
}