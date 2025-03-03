import { Exclude, Expose, Type } from "class-transformer";
import { ProductResDto } from "src/api/products/dto/product-res.dto";

@Exclude()
export class CartItemResDto {

    @Expose()
    id: string;

    @Expose()
    @Type(() => ProductResDto)
    product: ProductResDto;

    @Expose()
    quantity: number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

}