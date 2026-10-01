import { type ITaskEntity } from '../entities/task.entity';

export interface ITaskNotificationResult {
  sentAt: Date;
  recipientCount: number;
}

export const TASK_NOTIFIER_TOKEN = Symbol('TASK_NOTIFIER');

export interface ITaskNotifier {
  notifyCreated(task: ITaskEntity): Promise<ITaskNotificationResult> | ITaskNotificationResult;
}
