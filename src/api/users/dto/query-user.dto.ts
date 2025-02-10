import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNumber, IsOptional } from "class-validator";
import { QueryDto } from "src/common/dto/query.dto";
import { IRange } from "src/common/interface/app.interface";
import { UserGenderEnum, UserStatusEnum } from "src/constants/entity.constant";
import { subYears } from "date-fns";


export class QueryUserDto extends QueryDto {

    @IsOptional()
    @IsEnum(UserGenderEnum)
    gender?: UserGenderEnum;

    @IsOptional()
    @IsEnum(UserStatusEnum)
    status?: UserStatusEnum;

    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    verified?: boolean;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    minAge?: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    maxAge?: number;


    getRangeBirthDate(): IRange<Date> | null {
        const now = new Date();

        const gte = this.maxAge ? subYears(now, this.maxAge) : undefined;
        const lte = this.minAge ? subYears(now, this.minAge) : undefined;

        const range: IRange<Date> | null = {};
        if(gte) {
            range.gte = gte
        }
        if(lte) {
            range.lte = lte
        }

        return Object.keys(range).length === 0 ? null : range;
    }
}