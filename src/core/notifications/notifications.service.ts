import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  INotificationResult,
  type INotificationsModuleOptions,
  NOTIFICATIONS_OPTIONS_TOKEN,
} from './notifications.interface';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @Inject(NOTIFICATIONS_OPTIONS_TOKEN) private readonly options: INotificationsModuleOptions,
  ) {}

  notify(message: string, context?: Record<string, unknown>): INotificationResult {
    if (this.options.channel === 'silent') {
      return {
        sentAt: new Date(),
        channel: this.options.channel,
        delivered: false,
      };
    }

    this.logger.log(
      `[${this.options.appName}] Notification: ${message} - Context: ${JSON.stringify(context || {})}`,
    );

    return {
      sentAt: new Date(),
      channel: this.options.channel || 'console',
      delivered: true,
    };
  }
}
