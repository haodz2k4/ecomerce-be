import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { CategoryStatusEnum } from 'src/constants/entity.constant';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    
    @IsEnum(CategoryStatusEnum)
    @IsOptional()
    status?: CategoryStatusEnum;
}
