import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { BullModule } from '@nestjs/bullmq';
import { MailProcessor } from './mail.processor';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => (
        {
          transport: {
            service: 'gmail',
            auth:{
              user: configService.get<string>('SMTP_USERNAME'),
              pass: configService.get<string>('SMTP_PASS')
            }
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true
            }
          }
        }
      )
    }
  ),
  BullModule.registerQueue({
    name: 'mail'
  })
  ],
  providers: [MailService, MailProcessor],
  exports: [MailService]
})
export class MailModule {}
