export interface IAuditEntry {
  id: string;
  action: string;
  taskId: string;
  actorId: string;
  createdAt: Date;
}

export interface IAuditSinkStatus {
  instanceId: string;
  isConnected: boolean;
  bufferedCount: number;
}

export interface IAuditDiagnosticResponse {
  sink: IAuditSinkStatus;
  traceInstanceId: string;
  controllerInstanceId: string;
  requestId: string;
  actorId: string;
  probeIds: IProbeIds;
}

interface IProbeIds {
  first: string;
  second: string;
}
