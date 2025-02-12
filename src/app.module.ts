import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './api/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './api/auth/auth.module';
import { RolesModule } from './api/roles/roles.module';
import { PermissionsModule } from './api/permissions/permissions.module';
import { MailModule } from './mail/mail.module';
import { BullModule } from '@nestjs/bullmq';
import { ProductsModule } from './api/products/products.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    PermissionsModule,
    MailModule,
    ProductsModule,
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          username: configService.get<string>('REDIS_USERNAME'),
          password: configService.get<string>('REDIS_PASSWORD')
        }
      })
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
