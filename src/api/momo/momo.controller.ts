import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { MomoService } from './momo.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { User } from 'src/decorator/user.decorator';

@Controller('momo')
export class MomoController {
  constructor(private readonly momoService: MomoService) {}


  @Post('payment')
  payment(@User('id') userId: string,@Body() createPaymentDto: CreatePaymentDto) {
    return this.momoService.payment(userId, createPaymentDto);
  }

  @Get('notify/:orderId')
  nofify(@Param('orderId') orderId: string) {

  }
}
