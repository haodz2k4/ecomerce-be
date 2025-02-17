import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsString, Length } from "class-validator";

export class VerifyDto {
    
    @IsEmail()
    email: string;

    @IsString()
    otp: string
}