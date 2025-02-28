import { Expose } from "class-transformer";



export class ProductStatsResDto {
    @Expose()
    total: number;
    
    @Expose()
    active: number;

    @Expose()
    inactive: number;
}