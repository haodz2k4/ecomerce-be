import { Exclude, Expose, Transform, Type } from "class-transformer";
import { PermissionResDto } from "src/api/permissions/dto/permission-res.dto";
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
    @Transform(({ value }) => value.map((p) => p.permission))
    permissions: PermissionResDto[]

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}