import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtTypeEnum } from "src/constants/jwt.constant";


export class JwtRefreshStrategy extends PassportStrategy(Strategy, JwtTypeEnum.REFRESH) {

    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_REFRESH_SECRET')
        })
    }

    validate(...args: any[]): unknown {
        throw new Error("Method not implemented.");
    }
    
}