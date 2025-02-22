import { IsString, IsStrongPassword } from "class-validator";


export class ChangePasswordUserDto {

    @IsString()
    currentPassword: string;
    
    @IsStrongPassword()
    newPassword: string;
}