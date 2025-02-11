import { Expose } from "class-transformer";



export class RegisterResDto {
    
    @Expose()
    id: string;

    @Expose()
    roleId: string;

    @Expose()
    expiresIn: number;
}