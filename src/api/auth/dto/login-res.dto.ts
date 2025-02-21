import { Expose, Type } from "class-transformer";
import { UserResDto } from "src/api/users/dto/user-res.dto";


export class LoginResDto {

    @Expose()
    id: string;

    @Expose()
    roleId: string;

    @Expose()
    sessionId: string;

    @Expose()
    accessToken: string;

    @Expose()
    refreshToken: string;

    @Expose()
    expiresIn: Date;
}