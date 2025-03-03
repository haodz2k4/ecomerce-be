import { PartialType } from '@nestjs/mapped-types';
import { AddCartDto } from './add-cart.dto';

export class UpdateCartDto extends PartialType(AddCartDto) {}
