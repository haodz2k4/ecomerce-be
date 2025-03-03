import { Type } from "class-transformer";
import { IsNumber, IsString, Min } from "class-validator";


export class AddCartDto {

    @IsString()
    productId: string;

    @IsNumber()
    @Type(() => Number)
    @Min(0)
    quantity: number;
}
