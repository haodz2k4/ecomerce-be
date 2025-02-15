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