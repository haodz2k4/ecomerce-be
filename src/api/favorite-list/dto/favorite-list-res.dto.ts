import { Exclude, Expose, Type } from "class-transformer";
import { ProductResDto } from "src/api/products/dto/product-res.dto";
import { UserResDto } from "src/api/users/dto/user-res.dto";


@Exclude()
export class FavoriteListResDto {
    
    @Expose()
    id: string;

    @Expose()
    @Type(() => UserResDto)
    user: string;

    @Expose()
    @Type(() => ProductResDto)
    product: ProductResDto;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}