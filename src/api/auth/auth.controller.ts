import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { LoginResDto } from './dto/login-res.dto';
import { ResponseMessage } from 'src/decorator/response-message.decorator';

@Controller('auth')
export class AuthController {
    
    constructor(private authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Login success')
    login(@Body() loginDto: LoginDto) :Promise<LoginResDto> {
        return this.authService.login(loginDto)
    }
}
