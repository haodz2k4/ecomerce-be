import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './api/users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
