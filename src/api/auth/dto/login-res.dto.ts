import { Expose } from "class-transformer";


export class LoginResDto {

    @Expose()
    id: string;

    @Expose()
    roleId: string;

    @Expose()
    accessToken: string;

    @Expose()
    refreshToken: string;

    @Expose()
    expiresIn: Date;
}