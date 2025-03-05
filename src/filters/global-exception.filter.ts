import { ArgumentsHost, Catch, type ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Response, Request } from "express";
import { STATUS_CODES } from "http";
import { ErrorDto } from "src/common/dto/Error.dto";


@Catch() 
export class GlobalExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger(GlobalExceptionFilter.name);


    catch(exception: any, host: ArgumentsHost) {
        
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();
        let error: ErrorDto;
        if(exception instanceof HttpException) {
            error = this.handleHttpException(exception);
        } else  {
            error = this.handleError(exception)
        }
        res.status(error.statusCode).json({
            ...error,
            path: req.url 
        });
    }


    handleHttpException(exception: HttpException): ErrorDto {
        const statusCode = exception.getStatus()
        this.logger.debug(exception)
        return {
            statusCode,
            timestamp: new Date().toISOString(),
            error: STATUS_CODES[statusCode],
            message: exception.message,
        }
    }

    handleError(error: Error): ErrorDto {
        const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

        const errorRes = {
            statusCode,
            timestamp: new Date().toISOString(),
            error: STATUS_CODES[statusCode],
            message: error.message || 'An unexpected error occurred'
        }

        this.logger.error(error);
        return errorRes
    }
    
}