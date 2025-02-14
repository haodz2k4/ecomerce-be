import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { generateCacheKey } from 'src/utils/cache.util';
import { CacheKeyEnum } from 'src/constants/cache.constant';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private mailService: MailService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    async validateUser(email: string, password: string): Promise<Users> {
        const user = await this.usersService.getUserByEmail(email);
        
        if(!user || !await verifyPassword(password, user.password)){
            throw new UnauthorizedException("Invalid email or password");
        }
        if(!user.verified) {
            const verifyEmailToken = await this.generateVerifyEmailToken(user.id, user.roleId);
            await this.mailService.sendUserVerifyEmail(email, user.fullName, verifyEmailToken)
            throw new UnauthorizedException("User is not verify, please check your email to verify again");
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
        const expiresIn = parseInt(ms(this.configService.get('JWT_REFRESH_EXPIRES')))
        const session = await this.usersService.createUserSession(id,new Date(Date.now() + expiresIn) )
        const token = await this.generateAuthToken(id, id, session.id);
        return plainToInstance(LoginResDto, {
            id,
            roleId,
            ...token,
            expiresIn: expiresIn / 1000
        })
    }

    async logout(sessionId: string) :Promise<void> {
        await this.cacheManager.set(generateCacheKey(CacheKeyEnum.REFRESH_BLACKLIST, sessionId), true)
    }

    async generateAuthToken(id: string, roleId: string, sessionId: string) {

        return {
            accessToken: await this.jwtService.signAsync(
                {id, roleId, sessionId},
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES')
                }
            ),
            refreshToken: await this.jwtService.signAsync(
                {id, roleId, sessionId},
                {
                    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                    expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES')
                }
            )
        }
        
    }

    async isTokenInBlackList(sessionId: string) :Promise<boolean> {
        return await this.cacheManager.get(generateCacheKey(CacheKeyEnum.REFRESH_BLACKLIST, sessionId)) ?? false
    }

    async register(registerDto: RegisterDto) :Promise<RegisterResDto> {
        const {fullName, email, password, gender, birthDate} = registerDto
        const user = await this.usersService.create({
            fullName, 
            email, 
            password, 
            gender, 
            birthDate,
            roleId: RoleUser    
        })

        const verifyEmailToken = await this.generateVerifyEmailToken(user.id, user.roleId);
        await this.mailService.sendUserVerifyEmail(email, fullName, verifyEmailToken)

        return plainToInstance(RegisterResDto, {
            id: user.id,
            roleId: RoleUser,
            expiresIn: ms(this.configService.get('JWT_VERIFY_EMAIL_EXPIRES'))
        
        })
    }

    async generateVerifyEmailToken(userId: string, roleId: string): Promise<string> {
         
        return this.jwtService.signAsync(
            {
                id: userId, 
                roleId
            },
            {
                secret: this.configService.get('JWT_VERIFY_EMAIL_SECRET'),
                expiresIn: this.configService.get('JWT_VERIFY_EMAIL_EXPIRES')
            }
        )
    }

    async verify(token: string) :Promise<void> {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: this.configService.get<string>('JWT_VERIFY_EMAIL_SECRET')
        });

        const {id} = payload;
        await this.usersService.update(id, {verified: true})
    }
    
}
