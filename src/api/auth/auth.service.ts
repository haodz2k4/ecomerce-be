import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { LoginResDto } from './dto/login-res.dto';
import { verifyPassword } from 'src/utils/password.util';
import { Users } from '@prisma/client';
import * as ms from 'ms';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async validateUser(email: string, password: string): Promise<Users> {
        const user = await this.usersService.getUserByEmail(email);
        if(!user || !await verifyPassword(password, user.password)){
            throw new NotFoundException("Invalid email or password");
        }
        return user;
    }

    async login(loginDto: LoginDto) :Promise<LoginResDto> {
        const {email, password} = loginDto
        const user = await this.validateUser(email, password);
        const {id} = user
        const token = await this.generateAuthToken(id, id);
        const expiresIn = ms(this.configService.get('JWT_REFRESH_EXPIRES')) 
        return plainToInstance(LoginResDto, {
            id,
            roleId: id,
            ...token,
            expiresIn
        })
    }

    async generateAuthToken(id: string, roleId: string) {

        return {
            accessToken: await this.jwtService.signAsync(
                {id, roleId},
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES')
                }
            ),
            refreshToken: await this.jwtService.signAsync(
                {id, roleId},
                {
                    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                    expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES')
                }
            )
        }
        
    }
}
