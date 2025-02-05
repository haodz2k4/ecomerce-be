import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { StrategyName } from "src/constants/strategy.constant";



@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, StrategyName.JWT_ACCESS) {

    constructor(private configService: ConfigService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
        });
    }

    validate(...args: any[]): unknown {
        return null 
    }
    
}