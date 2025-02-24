import { Exclude, Expose } from "class-transformer";


@Exclude()
export class UploadSingleResDto {

    @Expose()
    url: string
}