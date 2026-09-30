import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import type { Response } from 'express';
import { map, Observable } from 'rxjs';
import { IApiResponse } from '../interfaces/api.response.interface';

@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<
  T,
  IApiResponse<T> | undefined
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<IApiResponse<T> | undefined> {
    const startTime = performance.now();

    return next.handle().pipe(
      map((data) => {
        const res = context.switchToHttp().getResponse<Response>();

        if (res.statusCode === 204 || data === undefined) return undefined;

        const durationMs = Number((performance.now() - startTime).toFixed(2));
        const timestamp = new Date().toISOString();

        const response: IApiResponse<T> = {
          success: true,
          data,
          timestamp,
          durationMs,
        };

        return response;
      }),
    );
  }
}
