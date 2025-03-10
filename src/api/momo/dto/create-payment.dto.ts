import { Type } from "class-transformer";
import { IsNumber, IsString, IsUrl } from "class-validator";


export class CreatePaymentDto {

    @IsNumber()
    @Type(() => Number)
    amount: number;

    @IsString()
    orderId: string;

    @IsString()
    redirectUrl: string;

    @IsString()
    ipnUrl: string;
}