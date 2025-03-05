import { Exclude, Expose, Type } from "class-transformer";
import { UserResDto } from "src/api/users/dto/user-res.dto";
import { OrderStatusEnum } from "src/constants/entity.constant";
import { OrderItemResDto } from "./order-item-res.dto";


@Exclude()
export class OrderResDto {

    @Expose()
    id: string;

    @Expose()
    status: OrderStatusEnum;

    @Expose()
    @Type(() => UserResDto)
    user: UserResDto;

    @Expose()
    totalPrice: number;

    @Expose()
    @Type(() => OrderItemResDto)
    ordersItems: OrderItemResDto[];

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}