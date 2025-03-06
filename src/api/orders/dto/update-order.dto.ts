import { PickType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
//Only update status order
export class UpdateOrderDto extends PickType(CreateOrderDto,['status']) {}
