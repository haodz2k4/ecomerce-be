import { Expose } from "class-transformer";
import { PaginatedResDto } from "src/common/dto/paginated-res.dto";
import { CartItemResDto } from "./cart-item-res.dto";


export class CartResDto {

    @Expose()
    id: string;

    @Expose()
    userId: string;

    @Expose()
    cart_items: PaginatedResDto<CartItemResDto>
}