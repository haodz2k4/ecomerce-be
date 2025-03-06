import { ProductResDto } from 'src/api/products/dto/product-res.dto';
import { Exclude, Expose, Type } from "class-transformer";

@Exclude()
export class OrderItemResDto {

    @Expose()
    id: string;

    @Expose()
    @Type(() => ProductResDto)
    product: Pick<ProductResDto, 'id' | 'title'|'price'| 'discountPercentage' | 'thumbnail' | 'inventories'>;

    @Expose()
    price: number;

    @Expose()
    quantity: number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}