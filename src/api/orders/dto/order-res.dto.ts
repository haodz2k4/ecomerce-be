
import { Exclude, Expose, Type } from "class-transformer";
import { OrderStatusEnum } from "src/constants/entity.constant";
import { OrderItemResDto } from "./order-item-res.dto";
import { UserResDto } from "src/api/users/dto/user-res.dto";


@Exclude()
export class OrderResDto {

    @Expose()
    id: string;

    @Expose()
    status: OrderStatusEnum;

    @Expose()
    user: Pick<UserResDto, 'id' | 'fullName' | 'email'>;
    
    @Expose()
    address: string;

    @Expose()
    phone: string;

    @Expose()
    paymentMethod: string;

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