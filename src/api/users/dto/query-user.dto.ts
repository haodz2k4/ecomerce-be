import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNumber, IsOptional } from "class-validator";
import { QueryDto } from "src/common/dto/query.dto";
import { IRange } from "src/common/interface/app.interface";
import { UserGenderEnum, UserStatusEnum } from "src/constants/entity.constant";



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


    getRangeAge(): IRange<number> {
        return {
            gte: this.minAge,
            lte: this.maxAge
        }
    }
}