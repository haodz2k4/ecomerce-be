import { Exclude, Expose, Type } from "class-transformer";
import { ProductResDto } from "src/api/products/dto/product-res.dto";

@Exclude()
export class InventoryResDto {

    @Expose()
    id: string;

    @Expose()
    supplier: string;

    @Expose()
    address: string;

    @Expose()
    @Type(() => ProductResDto)
    product: string;

    @Expose()
    quantity: number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;



}