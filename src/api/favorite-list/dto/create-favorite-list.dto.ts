import { IsUUID } from "class-validator";

export class CreateFavoriteListDto {
    
    @IsUUID()
    productId: string;
}
