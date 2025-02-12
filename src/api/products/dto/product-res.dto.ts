import { Exclude, Expose } from "class-transformer";
import { ProductStatusEnum } from "src/constants/entity.constant";

@Exclude()
export class ProductResDto {

    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    slug: string;

    @Expose()
    description: string;

    @Expose()
    discountPercentage: number;

    @Expose()
    price: number;

    @Expose()
    status: ProductStatusEnum;

    @Expose()
    thumbnail: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}