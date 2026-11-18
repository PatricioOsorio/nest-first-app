import { ApiKeyGuard } from '@/common/guards/api-key.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuditSinkService } from './audit-sink.service';
import type { IAuditDiagnosticResponse } from './audit.interface';
import { DiagnosticProbeService } from './diagnostic-probe.service';
import { RequestTraceService } from './request-trace.service';

@Controller('audit')
@UseGuards(ApiKeyGuard)
export class AuditController {
  private readonly controllerInstanceId: string = crypto.randomUUID().slice(0, 8);

  constructor(
    private readonly auditSink: AuditSinkService,
    private readonly requestTrace: RequestTraceService,
    private readonly firstProbe: DiagnosticProbeService,
    private readonly secondProbe: DiagnosticProbeService,
  ) {}

  @Get('diagnostics')
  getDiagnostic(): IAuditDiagnosticResponse {
    return {
      sink: this.auditSink.getStatus(),
      traceInstanceId: this.requestTrace.instanceId,
      controllerInstanceId: this.controllerInstanceId,
      requestId: this.requestTrace.getRequestId(),
      actorId: this.requestTrace.getActorId(),
      probeIds: {
        first: this.firstProbe.instanceId,
        second: this.secondProbe.instanceId,
      },
    };
  }
}
