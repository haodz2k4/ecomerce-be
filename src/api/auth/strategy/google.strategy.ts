import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile } from "passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { UsersService } from "src/api/users/users.service";
import { RoleUser } from "src/constants/role.constant";
import { AuthService } from "../auth.service";
import { UserProviderEnum } from "src/constants/entity.constant";
import { LoginResDto } from "../dto/login-res.dto";
import { UserResDto } from "src/api/users/dto/user-res.dto";
import * as ms from "ms";


@Injectable()
export class GoogleStrategry extends PassportStrategy(Strategy,'google') {

    constructor(
        private configService: ConfigService,
        private usersService: UsersService,
        private authService: AuthService
    ) {
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
            callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
            scope: ['email','profile']
        })
    }

    async validate(_accessToken: string, _refreshToken: string, profile: Profile, cb: VerifyCallback) {
        const {id, emails, photos, name} = profile;
        let user = await this.usersService.getUserByEmail(emails[0].value) as UserResDto;
        if(!user) {
            user = await this.usersService.create({
                fullName: `${name.familyName} ${name.givenName}`,
                email: emails[0].value,
                roleId: RoleUser,
                verified: true,
                avatar: photos[0].value
            })
            await this.usersService.createUserProvider({
                userId: user.id,
                provider: UserProviderEnum.GOOGLE,
                providerId: id
            })
        } else {
            const userProvider = await this.usersService.getUserProvider(id, UserProviderEnum.GOOGLE);
            if(!userProvider) {
                await this.usersService.createUserProvider({
                    userId: user.id,
                    provider: UserProviderEnum.GOOGLE,
                    providerId: id 
                })
            }
        }
        const expiresIn = parseInt(ms(this.configService.get('JWT_REFRESH_EXPIRES')))
        const session = await this.usersService.createUserSession(user.id,new Date(Date.now() + expiresIn) )
        const {accessToken, refreshToken} = await this.authService.generateAuthToken(user.id,user.roleId, session.id);

        return cb(null,{
            id: user.id,
            roleId: user.roleId,
            sessionId: session.id,
            accessToken,
            refreshToken,
            expiresIn: expiresIn / 1000
        })
        


    }
}