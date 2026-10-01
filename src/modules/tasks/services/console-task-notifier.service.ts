import { Injectable, Logger } from '@nestjs/common';
import { ITaskEntity } from '../entities/task.entity';
import { ITaskNotificationResult, ITaskNotifier } from '../interfaces/task-notifier.interface';

@Injectable()
export class ConsoleTaskNotifierService implements ITaskNotifier {
  private readonly logger = new Logger(ConsoleTaskNotifierService.name);

  constructor(private readonly appName: string) {}

  notifyCreated(task: ITaskEntity): Promise<ITaskNotificationResult> | ITaskNotificationResult {
    this.logger.log(
      `[AppName] ${this.appName} - New Task Created: ${task.title} (ID: ${task.id}) for User ID: ${task.userId}`,
    );

    return {
      sentAt: new Date(),
      recipientCount: 1,
    };
  }
}
