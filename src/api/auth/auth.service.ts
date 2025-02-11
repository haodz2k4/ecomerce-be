import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { LoginResDto } from './dto/login-res.dto';
import { verifyPassword } from 'src/utils/password.util';
import { Users } from '@prisma/client';
import * as ms from 'ms';
import { RegisterDto } from './dto/register.dto';
import { RoleUser } from 'src/constants/role.constant';
import { RegisterResDto } from './dto/register-res.dto';
import { UserStatusEnum } from 'src/constants/entity.constant';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private mailService: MailService
    ) {}

    async validateUser(email: string, password: string): Promise<Users> {
        const user = await this.usersService.getUserByEmail(email);
        if(!user || !await verifyPassword(password, user.password)){
            throw new UnauthorizedException("Invalid email or password");
        }
        if(!user.verified) {
            throw new UnauthorizedException("User is not verify");
        }
        if(user.status === UserStatusEnum.INACTIVE) {
            throw new UnauthorizedException("Account has been locked");
        }
        return user;
    }

    async login(loginDto: LoginDto) :Promise<LoginResDto> {
        const {email, password} = loginDto
        const user = await this.validateUser(email, password);
        const {id, roleId} = user
        const token = await this.generateAuthToken(id, id);
        const expiresIn = ms(this.configService.get('JWT_REFRESH_EXPIRES')) 
        return plainToInstance(LoginResDto, {
            id,
            roleId,
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

    async register(registerDto: RegisterDto) {
        const {fullName, email, password, gender, birthDate} = registerDto
        const user = await this.usersService.create({
            fullName, 
            email, 
            password, 
            gender, 
            birthDate,
            roleId: RoleUser
        })

        const token = await this.generateAuthToken(user.id, RoleUser);
        const verifyEmailToken = await this.generateVerifyEmailToken(user.id, user.roleId);
        await this.mailService.sendUserVerifyEmail(email, fullName, verifyEmailToken)
        return plainToInstance(RegisterResDto, {
            id: user.id,
            roleId: RoleUser,
            ...token
        
        })
    }

    async generateVerifyEmailToken(userId: string, roleId: string): Promise<string> {
         
        return this.jwtService.signAsync(
            {
                id: userId, roleId
            },
            {
                secret: this.configService.get('JWT_VERIFY_EMAIL_SECRET'),
                expiresIn: this.configService.get('JWT_VERIFY_EMAIL_EXPIRES')
            }
        )
    }

    
}
