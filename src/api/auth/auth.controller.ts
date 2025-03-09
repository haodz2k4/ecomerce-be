import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { LoginResDto } from './dto/login-res.dto';
import { ResponseMessage } from 'src/decorator/response-message.decorator';
import { Public } from 'src/decorator/public.decorator';
import { RegisterDto } from './dto/register.dto';
import { RegisterResDto } from './dto/register-res.dto';
import { User } from 'src/decorator/user.decorator';
import { PayloadType } from './types/payload.type';
import { VerifyDto } from './dto/verify.dto';
import { VerifyResDto } from './dto/verify-res.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { GoogleAuthGuard } from 'src/guards/google-auth.guard';

@Controller('auth')
export class AuthController {
    
    constructor(private authService: AuthService) {}


    @Get('google')
    @Public()
    @UseGuards(GoogleAuthGuard)
    google() {}

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    @Public()
    googleLogin(@User() user: PayloadType): LoginResDto {
        return this.authService.googleLogin(user)
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @Public()
    @ResponseMessage('Login success')
    login(@Body() loginDto: LoginDto) :Promise<LoginResDto> {
        return this.authService.login(loginDto)
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@User() user: PayloadType) :Promise<void> {
        const {sessionId} = user
        return this.authService.logout(sessionId)
    }

    @Get('verify-token')
    verifyToken(@User() user: PayloadType): PayloadType {
        return user
    }


    @Public()
    @Post('register')
    @Post()
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Register successfully, please check your email')
    register(@Body() registerDto: RegisterDto):Promise<RegisterResDto> {
        return this.authService.register(registerDto);
    }

    @Public()
    @Get('verify')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Verify email successfully')
    verify(@Query('token') token: string ) :Promise<void> {
        return this.authService.verify(token)
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('forgot')
    @ResponseMessage('Forgot password')
    forgotPassword(@Body('email') email: string) :Promise<void> {
        return this.authService.forgotPassword(email)
    }

    @Post('verify-otp')
    @Public()
    @ResponseMessage('Verify otp')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Verify Otp')
    verifyOtp(@Body() verifyDto: VerifyDto) :Promise<VerifyResDto> {
        return this.authService.verifyOtp(verifyDto)
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Reset password')
    @Post('reset-password')
    resetPassword(@Body() resetPasswordDto: ResetPasswordDto ) :Promise<void> {
        return this.authService.resetPassword(resetPasswordDto)
    }
    
}
