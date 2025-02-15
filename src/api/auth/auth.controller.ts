import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { LoginResDto } from './dto/login-res.dto';
import { ResponseMessage } from 'src/decorator/response-message.decorator';
import { Public } from 'src/decorator/public.decorator';
import { RegisterDto } from './dto/register.dto';
import { RegisterResDto } from './dto/register-res.dto';
import { User } from 'src/decorator/user.decorator';
import { PayloadType } from './types/payload.type';

@Controller('auth')
export class AuthController {
    
    constructor(private authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @Public()
    @ResponseMessage('Login success')
    login(@Body() loginDto: LoginDto) :Promise<LoginResDto> {
        return this.authService.login(loginDto)
    }

    @Post('logout')
    logout(@User() user: PayloadType) :Promise<void> {
        const {sessionId} = user
        return this.authService.logout(sessionId)
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
}
