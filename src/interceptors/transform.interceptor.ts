import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { map, Observable } from "rxjs";
import { Response } from "src/common/interface/response.interface";
import { RESPONSE_MESSAGE } from "src/constants/app.constant";


@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {

    constructor(private reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> {

        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        const message = this.reflector.get(RESPONSE_MESSAGE, context.getHandler()) || "Success";
        
        return next.handle().pipe(map(data => ({ 
                        message,
                        statusCode,
                        data
                    }
                )
            )
        );
    }
}