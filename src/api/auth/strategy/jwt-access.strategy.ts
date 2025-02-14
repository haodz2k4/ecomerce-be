import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { StrategyName } from "src/constants/strategy.constant";
import { PayloadType } from "../types/payload.type";
import { AuthService } from "../auth.service";



@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, StrategyName.JWT_ACCESS) {

    constructor(
        private configService: ConfigService,
        private authService: AuthService
    ) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
        });
    }

    async validate(payload: PayloadType): Promise<PayloadType> {
        if(await this.authService.isTokenInBlackList(payload.sessionId)) {
            throw new UnauthorizedException("Token is in blacklist")
        }
        return payload
    }
    
}