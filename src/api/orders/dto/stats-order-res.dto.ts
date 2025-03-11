import { Expose } from "class-transformer";


export class StatsOrderResDto {

    @Expose()
    totalOrders: number;
    
    @Expose()
    totalRevenue: number;

    @Expose()
    totalProductsSold: number;

    @Expose()
    totalCustomer: number;
}