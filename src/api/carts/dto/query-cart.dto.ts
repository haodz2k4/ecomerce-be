import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { QueryDto } from "src/common/dto/query.dto";
import { IRange } from "src/common/interface/app.interface";



export class QueryCartDto extends QueryDto {

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    minQuantity?: number;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    maxQuantity?: number;

    getRangeQuantity(): IRange<number> | null {
        
        const range: IRange<number> = {}
        if(this.minQuantity) {
            range.gte = this.minQuantity
        }
        if(this.maxQuantity) {
            range.lte = this.maxQuantity
        }
        return Object.keys(range).length > 0 ? range : null
    }
}