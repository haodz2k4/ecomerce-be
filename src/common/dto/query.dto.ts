import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { DefaultSortBy, DefaultSortOrder, SortOrderEnum } from "src/constants/app.constant";
import { IRange } from "../interface/app.interface";


export class QueryDto {

    @IsString()
    @IsOptional()
    keyword?: string;

    @IsNumber()
    @Type(() => Number)
    @Min(1)
    @IsOptional()
    page?: number = 1;

    @IsNumber()
    @Type(() => Number)
    @Min(1)
    @IsOptional()
    limit?: number = 100;

    @IsString()
    @IsOptional()
    sortBy?: string = DefaultSortBy;

    @IsEnum(SortOrderEnum)
    @IsOptional()
    sortOrder?: SortOrderEnum = DefaultSortOrder;

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

    getRangeUpdatedAt(): IRange<Date> {
        return {
            gte: this.startUpdatedAt,
            lte: this.endUpdatedAt
        }
    }

}