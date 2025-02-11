import { Exclude, Expose } from "class-transformer";
import { PermissionNameEnum } from "src/constants/entity.constant";


@Exclude()
export class PermissionResDto {
    
    @Expose()
    id: string;

    @Expose()
    name: PermissionNameEnum;

    @Expose()
    resource: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}