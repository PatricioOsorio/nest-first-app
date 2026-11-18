import type { IAuthenticatedRequest } from '@/common/interfaces/authenticated-request.interface';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class RequestTraceService {
  readonly instanceId: string = crypto.randomUUID().slice(0, 8);

  constructor(@Inject(REQUEST) private readonly request: IAuthenticatedRequest) {}

  getRequestId(): string {
    const requestId = this.request.headers['x-request-id'];

    if (!requestId || requestId.length === 0) return 'unknown';

    if (Array.isArray(requestId)) return requestId[0];

    return requestId;
  }

  getActorId(): string {
    return this.request.user?.id ?? 'anonymous';
  }
}
