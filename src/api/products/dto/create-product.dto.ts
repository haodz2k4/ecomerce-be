import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";
import { ProductStatusEnum } from "src/constants/entity.constant";


export class CreateProductDto {

    @IsString()
    title: string;

    @IsUUID()
    categoryId: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsOptional()
    @Min(0)
    @Max(100)
    @Type(() => Number)
    discountPercentage: number;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    price: number;

    @IsEnum(ProductStatusEnum)
    @IsOptional()
    status: ProductStatusEnum;

}
