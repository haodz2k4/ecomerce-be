import { HttpStatus } from "@nestjs/common";

export class ErrorDto {
    timestamp: string;
    statusCode: HttpStatus;
    error: string;
    errorCode?: string;
    message: string;
    errors?: string[];
}