import { Exclude, Expose } from "class-transformer";
import { CategoryStatusEnum } from "src/constants/entity.constant";


@Exclude()
export class CategoriesResDto {

    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    slug: string;

    @Expose()
    description: string;

    @Expose()
    thumbnail: string;

    @Expose()
    status: CategoryStatusEnum;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
    
}