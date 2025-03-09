import { Expose } from "class-transformer";
import { UserProviderEnum } from "src/constants/entity.constant";


export class UserProviderResDto {
    @Expose()
    id: string;

    @Expose()
    userId: string;

    @Expose()
    provider: UserProviderEnum;

    @Expose()
    providerId: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}