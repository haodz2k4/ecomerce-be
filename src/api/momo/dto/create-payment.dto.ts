import { OmitType } from "@nestjs/mapped-types";
import { CreateOrderDto } from "src/api/orders/dto/create-order.dto";


export class CreatePaymentDto extends OmitType(CreateOrderDto, ['status','paymentMethod']) {

    
}