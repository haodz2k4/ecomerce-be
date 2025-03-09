import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessStrategy } from './strategy/jwt-access.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { MailModule } from 'src/mail/mail.module';
import { GoogleStrategry } from './strategy/google.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({global: true}),
    PassportModule,
    MailModule
  ],
  providers: [AuthService, JwtAccessStrategy, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }, GoogleStrategry],
  controllers: [AuthController]
})
export class AuthModule {}
