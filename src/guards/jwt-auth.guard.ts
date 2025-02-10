import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "src/constants/app.constant";
import { StrategyName } from "src/constants/strategy.constant";


@Injectable()
export class JwtAuthGuard extends AuthGuard(StrategyName.JWT_ACCESS) implements CanActivate {

    constructor(private reflector: Reflector) {
        super()
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        
        if(isPublic) {
            return true;
        }

        return super.canActivate(context)
    }

}