import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class DiagnosticProbeService {
  readonly instanceId: string = crypto.randomUUID().slice(0, 8);
}
