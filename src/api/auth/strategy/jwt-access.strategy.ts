import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtTypeEnum } from "src/constants/jwt.constant";



@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, JwtTypeEnum.ACCESS) {

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