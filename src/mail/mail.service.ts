import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {

    constructor(
        private mailerService: MailerService,
        private configService: ConfigService
    ) {}
    async sendUserVerifyEmail(to: string, fullName: string, token: string) {

        const url = `${this.configService.get('URL_APP')}/api/v1/verify?token=${token}`
        await this.mailerService.sendMail({
            to,
            subject: 'Please verify your email',
            template: './confirmation',
            context: {
                name: fullName,
                url
            }
        })
    }
}
