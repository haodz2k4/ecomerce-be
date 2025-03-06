import { Inventories } from "@prisma/client";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import { CategoriesResDto } from "src/api/categories/dto/categories-res.dto";
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
    @Transform(({value}: {value: Inventories[]}) =>  {
        if(!value) {
            return;
        }
        return ({
            quantity: value.reduce((sum, item) => sum + item.quantity, 0),
            total: value.length
        })
    })
    inventories?: {
        quantity: number;
        total: number;
    };

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
    @Transform(({value = []}) => value.map((item) => item.url))
    images: string[]

    @Expose()
    @Type(() => CategoriesResDto)
    category: CategoriesResDto;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}