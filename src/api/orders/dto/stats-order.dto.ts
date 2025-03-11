import { Type } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";
import { IRange } from "src/common/interface/app.interface";


export class StatsOrderDto {

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    startAt: Date;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    endAt: Date;

    getRangeDate() :IRange<Date> | null {
        const range: IRange<Date> = {};
        if(this.startAt) {
            range.lte = this.startAt
        }
        if(this.endAt) {
            range.gte = this.endAt
        }

        return Object.keys(range).length !== 0 ? range : null;
    }

}