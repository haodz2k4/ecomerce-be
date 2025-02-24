import { Expose, Transform } from "class-transformer";


export class UploadMultiResDto {

    @Expose()
    @Transform(({value = []}) => value.map((item) => item.url))
    urls: string;
}