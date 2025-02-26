import { IsEnum, IsOptional, IsString, IsUrl } from "class-validator";
import { CategoryStatusEnum } from "src/constants/entity.constant";

export class CreateCategoryDto {

    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsUrl()
    @IsOptional()
    thumbnail: string;

    @IsOptional()
    @IsEnum(CategoryStatusEnum)
    status?: CategoryStatusEnum;

}
