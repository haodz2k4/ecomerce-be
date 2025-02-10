import { Exclude, Expose } from "class-transformer";
import { RoleStatusEnum } from "src/constants/entity.constant";


@Exclude()
export class RoleResDto {

    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    status: RoleStatusEnum;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}