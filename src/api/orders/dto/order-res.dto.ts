import { Expose } from "class-transformer";
import { OrderStatusEnum } from "src/constants/entity.constant";



export class OrderResDto {

    @Expose()
    id: string;

    @Expose()
    status: OrderStatusEnum;

    @Expose()
    totalPrice: number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}