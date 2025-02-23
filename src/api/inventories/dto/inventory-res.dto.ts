import { Exclude, Expose } from "class-transformer";

@Exclude()
export class InventoryResDto {

    @Expose()
    id: string;

    @Expose()
    supplier: string;

    @Expose()
    address: string;

    @Expose()
    productId: string;

    @Expose()
    quantity: number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;



}