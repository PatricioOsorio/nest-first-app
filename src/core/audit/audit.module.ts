import { Module } from '@nestjs/common';
import { AuditSinkService } from './audit-sink.service';
import { AuditController } from './audit.controller';
import { DiagnosticProbeService } from './diagnostic-probe.service';
import { RequestTraceService } from './request-trace.service';

@Module({
  controllers: [AuditController],
  providers: [AuditSinkService, RequestTraceService, DiagnosticProbeService],
  exports: [AuditSinkService],
})
export class AuditModule {}
