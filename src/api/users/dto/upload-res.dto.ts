import { Exclude, Expose } from "class-transformer";


@Exclude()
export class UploadResDto {

    @Expose()
    avatar: string;
}