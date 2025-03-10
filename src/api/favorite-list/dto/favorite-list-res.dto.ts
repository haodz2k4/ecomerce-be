import { Expose } from "class-transformer";



export class FavoriteListResDto {
    
    @Expose()
    id: string;

    @Expose()
    userId: string;

    @Expose()
    productId: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}