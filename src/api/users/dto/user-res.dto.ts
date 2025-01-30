import { Exclude, Expose } from "class-transformer";
import { UserGenderEnum, UserStatusEnum } from "src/constants/entity.constant";

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
}