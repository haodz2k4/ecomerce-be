import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
import { JobEnum } from 'src/constants/job.enum';

@Injectable()
export class MailService {

    constructor(
        private mailerService: MailerService,
        private configService: ConfigService,
        @InjectQueue('mail') private mailQueue: Queue
    ) {}
    async sendUserVerifyEmail(to: string, fullName: string, token: string) {

        const url = `${this.configService.get('URL_APP')}/api/v1/auth/verify?token=${token}`
        await this.mailQueue.add(JobEnum.SEND_VERIFY_EMAIL, {
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
