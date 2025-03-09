import { IsEnum, IsString, IsUUID } from "class-validator";
import { UserProviderEnum } from "src/constants/entity.constant";


export class CreateUserProvider {

    @IsUUID()
    userId: string;

    @IsEnum(UserProviderEnum)
    provider: UserProviderEnum;

    @IsString()
    providerId: string;
}