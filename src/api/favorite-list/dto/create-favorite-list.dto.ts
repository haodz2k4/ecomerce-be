import { IsUUID } from "class-validator";

export class CreateFavoriteListDto {

    @IsUUID()
    userId: string;

    @IsUUID()
    productId: string;
}
