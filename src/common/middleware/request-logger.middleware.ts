import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = performance.now();

    const requestId = (req.headers['x-request-id'] as string) || randomUUID();

    req.headers['x-request-id'] = requestId;
    res.setHeader('X-Request-ID', requestId);

    res.on('finish', () => {
      const duration = (performance.now() - startTime).toFixed(2);
      const { method, originalUrl } = req;
      const { statusCode } = res;

      const logMessage = `🦆 [${requestId}] ${method} ${originalUrl} ${statusCode} ${duration}ms`;

      if (statusCode >= 500) {
        return this.logger.error(logMessage);
      }

      if (statusCode >= 400) {
        return this.logger.warn(logMessage);
      }

      return this.logger.log(logMessage);
    });

    res.on('close', () => {
      if (!res.writableEnded) {
        this.logger.warn(
          `[${requestId}] Request aborted by client: ${req.method} ${req.originalUrl}`,
        );
      }
    });

    next();
  }
}
