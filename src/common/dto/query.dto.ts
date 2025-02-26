import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { DEFAULT_LIMIT, DefaultSortBy, DefaultSortOrder, SortOrderEnum } from "src/constants/app.constant";
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
    limit?: number = DEFAULT_LIMIT;

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

    getRangeCreatedAt(): IRange<Date> | null {
        const range: IRange<Date> = {};
        if(this.startCreatedAt) {
            range.gte = this.startCreatedAt
        }

        if(this.endCreatedAt) {
            range.lte = this.endCreatedAt;
        }
        return Object.keys(range).length === 0 ? null : range;
        
    }

    getRangeUpdatedAt(): IRange<Date> | null {
        const range: IRange<Date> = {};
        if(this.startUpdatedAt) {
            range.gte = this.startUpdatedAt
        }

        if(this.endUpdatedAt) {
            range.lte = this.endUpdatedAt;
        }
        return Object.keys(range).length === 0 ? null : range;
    }

}