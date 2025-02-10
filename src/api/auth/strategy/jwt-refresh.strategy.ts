import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { StrategyName } from "src/constants/strategy.constant";
import { PayloadType } from "../types/payload.type";


export class JwtRefreshStrategy extends PassportStrategy(Strategy, StrategyName.JWT_REFRESH) {

    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_REFRESH_SECRET')
        })
    }

    validate(payload: PayloadType): PayloadType {
        console.log(payload)
        return payload
    }
    
}