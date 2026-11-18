import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnModuleDestroy,
  OnModuleInit,
  Scope,
  ServiceUnavailableException,
} from '@nestjs/common';
import { IAuditEntry, IAuditSinkStatus } from './audit.interface';

@Injectable({ scope: Scope.DEFAULT })
export class AuditSinkService implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy {
  readonly instanceId: string = crypto.randomUUID().slice(0, 8);
  private connected = false;
  private readonly entries: IAuditEntry[] = [];
  private readonly logger = new Logger(AuditSinkService.name);

  onModuleInit() {
    this.connected = true;
    this.logger.log(`🔍 [AuditSink] ${this.instanceId} - Connection opened (onModuleInit)`);
  }

  onApplicationBootstrap() {
    this.logger.log(
      `🔍 [AuditSink] ${this.instanceId} - Application bootstrap completed (onApplicationBootstrap)`,
    );
  }

  onModuleDestroy() {
    this.logger.log(
      `🔍 [AuditSink] ${this.instanceId} - Module destroyed (onModuleDestroy) - Flush: ${this.entries.length} entries`,
    );
    this.entries.length = 0;
    this.connected = false;
  }

  record(entry: Omit<IAuditEntry, 'id' | 'createdAt'>): IAuditEntry {
    if (!this.connected) throw new ServiceUnavailableException('Audit sink is not connected');

    const auditEntry: IAuditEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    this.entries.push(auditEntry);

    return auditEntry;
  }

  getStatus(): IAuditSinkStatus {
    return {
      instanceId: this.instanceId,
      isConnected: this.connected,
      bufferedCount: this.entries.length,
    };
  }
}
