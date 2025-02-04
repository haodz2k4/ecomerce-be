import { Exclude, Expose } from "class-transformer";
import { UserGenderEnum, UserStatusEnum } from "src/constants/entity.constant";
import { verifyPassword } from "src/utils/password.util";

@Exclude()
export class UserResDto {

    @Expose()
    id: string;

    @Expose()
    fullName: string;

    @Expose()
    avatar: string;

    @Expose()
    email: string;

    @Expose({toPlainOnly: true})
    password: string

    @Expose()
    gender: UserGenderEnum;

    @Expose()
    status: UserStatusEnum;

    @Expose()
    verified: boolean;

    @Expose()
    birthDate: Date;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    async isMatchPassword(password: string): Promise<boolean> {
       return await verifyPassword(password, this.password)
    }
}