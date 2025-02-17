import { IsJWT, IsStrongPassword } from "class-validator";

export class ResetPasswordDto {

    @IsJWT()
    token: string;

    @IsStrongPassword()
    password: string;
}