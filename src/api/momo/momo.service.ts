import { Injectable } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import axios from 'axios';
import * as crypto from 'crypto-js';
import { ConfigService } from '@nestjs/config';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { OrderStatusEnum, PaymentMethodEnum } from 'src/constants/entity.constant';
import { MomoEnum } from 'src/constants/momo.enum';
@Injectable()
export class MomoService {

    constructor(
        private ordersService: OrdersService,
        private configService: ConfigService
    ) {}

    async payment(userId: string, createPaymentDto: CreatePaymentDto) {
        const { items, phone, address } = createPaymentDto;
        
        const partnerCode = this.configService.get<string>('MOMO_PARTNER_CODE');
        const accessKey = this.configService.get<string>('MOMO_ACCESS_KEY');
        const secretKey = this.configService.get<string>('MOMO_SECRET_KEY');
        const endpoint = this.configService.get<string>('MOMO_ENDPOINT');

        const order = await this.ordersService.create(userId, {
            paymentMethod: PaymentMethodEnum.CREDIT_CARD,
            status: OrderStatusEnum.PENDING,
            phone,
            address,
            items,
        });

        const amount = order.ordersItems.reduce((total, item) => total + item.price * item.quantity, 0);
        const orderId = order.id;
        const requestId = `${partnerCode}-${Date.now()}`;
        const requestType = MomoEnum.CAPTURE_WALLET;
        const orderInfo = `Thanh toán đơn hàng #${orderId}`;
        const extraData = '';

        const ipnUrl = `${this.configService.get('URL_APP')}/api/v1/momo/notify`; 
        const redirectUrl = `${this.configService.get('CORS_ORIGIN')}/payment-success/${orderId}`; 
        console.log(redirectUrl)
        const rawSignature = 
            `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}` +
            `&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}` +
            `&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

        const signature = crypto.HmacSHA256(rawSignature, secretKey).toString(crypto.enc.Hex);

        const requestBody = {
            partnerCode,
            requestId,
            amount,
            orderId,
            orderInfo,
            redirectUrl,
            ipnUrl,
            requestType,
            extraData,
            lang: 'vi',
            signature,
        };

        try {
            const response = await axios.post(endpoint, requestBody, {
                headers: { 'Content-Type': 'application/json' },
            });

            return {
                orderId,
                payUrl: response.data.payUrl,
            };
        } catch (error) {
            console.log(error)
            throw new Error(`Momo payment error: ${error.message}`);
        }
    }

    async notifyPayment() {

    }
}
