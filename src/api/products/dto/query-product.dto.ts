import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsUUID, Min } from "class-validator";
import { QueryDto } from "src/common/dto/query.dto";
import { ProductStatusEnum } from "src/constants/entity.constant";
import { IRange } from "src/common/interface/app.interface";

export class QueryProductDto extends QueryDto {
    
    @IsOptional()
    @IsEnum(ProductStatusEnum)
    status?: ProductStatusEnum;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    @Min(0)
    minPrice?: number;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    maxPrice?: number;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    minPercentage?: number;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    maxPercentage?: number;

    @IsUUID()
    @IsOptional()
    categoryId?: string;


    getRangePrice(): IRange<number> | null {
        const range: IRange<number> = {}
        if(this.minPrice) {
            range.gte = this.minPrice
        }

        if(this.maxPrice) {
            range.lte = this.maxPrice;
        }

        return Object.keys(range).length === 0 ? null : range
    }

    getRangePercentage(): IRange<number> | null {
        const range: IRange<number> = {}
        if(this.minPercentage) {
            range.gte = this.minPercentage
        }

        if(this.maxPercentage) {
            range.lte = this.maxPercentage;
        }

        return Object.keys(range).length === 0 ? null : range
    }

}