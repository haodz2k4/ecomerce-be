import { Type } from "class-transformer";
import { IsNumber, IsString, IsUUID, Min } from "class-validator";


export class CreateInventoryDto {

    @IsString()
    supplier: string;

    @IsUUID()
    productId: string;

    @IsString()
    address: string;

    @IsNumber()
    @Type(() => Number)
    @Min(0)
    quantity: number;
}
