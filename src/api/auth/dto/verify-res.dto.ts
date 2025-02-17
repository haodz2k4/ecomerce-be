import { Expose } from "class-transformer";


export class VerifyResDto {

    @Expose()
    id: string;

    @Expose()
    token: string;
}