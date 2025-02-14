import { IsEnum, IsOptional, IsString } from "class-validator";
import { CategoryStatusEnum } from "src/constants/entity.constant";

export class CreateCategoryDto {

    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    @IsEnum(CategoryStatusEnum)
    status?: CategoryStatusEnum;

}
