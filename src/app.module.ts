import { Favorite_list } from './../node_modules/.prisma/client/index.d';
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
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { CategoriesModule } from './api/categories/categories.module';
import { InventoriesModule } from './api/inventories/inventories.module';
import { UploadModule } from './api/upload/upload.module';
import { CartsModule } from './api/carts/carts.module';
import { OrdersModule } from './api/orders/orders.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { MomoModule } from './api/momo/momo.module';
import { FavoriteListModule } from './api/favorite-list/favorite-list.module';
@Module({
  imports: [
    MomoModule,
    InventoriesModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    OrdersModule,
    UsersModule,
    AuthModule,
    RolesModule,
    PermissionsModule,
    MailModule,
    ProductsModule,
    CategoriesModule,
    UploadModule,
    CartsModule,
    FavoriteListModule,
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
    }),
    CloudinaryModule,
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
        username: configService.get<string>('REDIS_USERNAME'),
        password: configService.get<string>('REDIS_PASSWORD')
      })
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    }
  ],
})
export class AppModule {}
