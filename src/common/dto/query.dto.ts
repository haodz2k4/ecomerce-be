import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { SortOrderEnum } from "src/constants/app.constant";
import { IRange } from "../interface/app.interface";


export class QueryDto {

    @IsString()
    @IsOptional()
    keyword?: string;

    @IsNumber()
    @Type(() => Number)
    @Min(1)
    @IsOptional()
    page?: number;

    @IsNumber()
    @Type(() => Number)
    @Min(1)
    @IsOptional()
    limit?: number;

    @IsString()
    @IsOptional()
    sortBy?: string;

    @IsEnum(SortOrderEnum)
    @IsOptional()
    sortOrder?: SortOrderEnum;

    //Range createdAt
    @IsDate()
    @IsOptional()
    startCreatedAt: Date;

    @IsDate()
    @IsOptional()
    endCreatedAt: Date;

    //Range updatedAt
    @IsDate()
    @IsOptional()
    startUpdatedAt: Date;

    @IsDate()
    @IsOptional()
    endUpdatedAt: Date;

    getSkip(): number {
        return (this.page - 1) * this.limit;
    }

    getRangeCreatedAt(): IRange<Date> {
        return {
            gte: this.startCreatedAt,
            lte: this.endCreatedAt
        }
    }

}