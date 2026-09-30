import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { IApiErrorResponse } from '../interfaces/api-error-response.interface';

interface IErrorDetails {
  statusCode: number;
  message: string | string[];
  error: string;
}

type IRecordResponse = Record<string, unknown>;

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  private extractErrorDetails(exception: unknown): IErrorDetails {
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const response = exception.getResponse();

      if (typeof response === 'string') {
        return { statusCode, error: exception.name, message: response };
      }

      if (typeof response === 'object' && response !== null) {
        const res = response as IRecordResponse;

        return {
          statusCode,
          error: (res.error as string) ?? exception.name,
          message: (res.message as string | string[]) ?? exception.message,
        };
      }

      return { statusCode, error: exception.name, message: exception.message };
    }

    // For non-HttpException errors, return a generic internal server error response
    const unexpectedMessage = exception instanceof Error ? exception.message : String(exception);
    this.logger.error(
      `Unexpected error: ${unexpectedMessage}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
      message: 'An unexpected error occurred.',
    };
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;

    const { statusCode, message, error } = this.extractErrorDetails(exception);

    const responseBody: IApiErrorResponse = {
      success: false,
      statusCode,
      error,
      message,
      timestamp: new Date().toISOString(),
      path: String(httpAdapter.getRequestUrl(ctx.getRequest())),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
