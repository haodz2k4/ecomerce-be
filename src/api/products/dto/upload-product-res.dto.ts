import { Expose, Transform } from "class-transformer";



export class UploadProductResDto {
    
    @Expose()
    @Transform(({value}) => value.secure_url)
    thumbnail: string;

    @Expose()
    @Transform(({value =[]}) => value.map((item) => item.secure_url))
    images: string[];
}