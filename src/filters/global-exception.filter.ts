import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, BadRequestException } from "@nestjs/common";
import { ValidationError } from "class-validator";
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
        console.error(exception)
        let error: ErrorDto;

        if (exception instanceof BadRequestException) {
            error = this.handleValidationError(exception);
        } else if (exception instanceof HttpException) {
            error = this.handleHttpException(exception);
        } else {
            error = this.handleError(exception);
        }

        res.status(error.statusCode).json({
            ...error,
            path: req.url
        });
    }

    handleHttpException(exception: HttpException): ErrorDto {
        const statusCode = exception.getStatus();
        this.logger.debug(exception);
        return {
            statusCode,
            timestamp: new Date().toISOString(),
            error: STATUS_CODES[statusCode],
            message: exception.message,
        };
    }

    handleError(error: Error): ErrorDto {
        const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        this.logger.error(error);
        return {
            statusCode,
            timestamp: new Date().toISOString(),
            error: STATUS_CODES[statusCode],
            message: error.message || "An unexpected error occurred",
        };
    }

    handleValidationError(exception: BadRequestException): ErrorDto {
        const response = exception.getResponse();

        let messages: string[] = [];
        if (typeof response === "object" && response["message"] && Array.isArray(response["message"])) {
            messages = response["message"];
        }
        this.logger.debug(exception)
        return {
            statusCode: HttpStatus.BAD_REQUEST,
            timestamp: new Date().toISOString(),
            error: STATUS_CODES[HttpStatus.BAD_REQUEST],
            message: exception.message || "Validation failed",
            errors: messages
        };
    }
}
